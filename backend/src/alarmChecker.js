import {alerts} from './routes/alerts.js';
import {db} from './db.js';
import {broadcastAlarm} from './websocket.js';

async function getMockPrice(symbol) {
    try {
        const [rows] = await db.query('SELECT market_value FROM stocks WHERE symbol = ?', [symbol]);
        return rows.length > 0 ? Number(rows[0].market_value) : null;
    } catch (err) {
        console.error('Fehler beim Preisabruf:', err);
        return null;
    }
}

function emitAlarmTriggered(alert, currentPrice) {
    const message = {
        symbol: alert.symbol,
        direction: alert.direction,
        threshold: alert.threshold,
        currentPrice,
        timestamp: new Date().toISOString()
    };

    broadcastAlarm(message);
}

async function checkAlerts() {
    for (const alert of alerts) {
        const currentPrice = await getMockPrice(alert.symbol);
        if (currentPrice == null || isNaN(currentPrice)) continue;

        const triggered =
            (alert.direction === 'above' && currentPrice > alert.threshold) ||
            (alert.direction === 'below' && currentPrice < alert.threshold);

        if (triggered) {
            console.log(`🔔 Preisalarm für ${alert.symbol} (${alert.direction} ${alert.threshold}) ausgelöst: ${currentPrice.toFixed(2)} €`);
            emitAlarmTriggered(alert, currentPrice);
        }
    }
}

function startAlertLoop(intervalMs = 10000) {
    setInterval(checkAlerts, intervalMs);
}

export {startAlertLoop};
