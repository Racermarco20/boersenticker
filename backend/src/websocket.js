import {WebSocketServer} from 'ws';
import {db} from './db.js';

const lastPrices = new Map();
const clients = new Set();

function getNextPrice(current) {
    const changePercent = (Math.random() * 0.1) - 0.05;
    const newPrice = current * (1 + changePercent);
    return parseFloat(newPrice.toFixed(2));
}

export let broadcastAlarm = () => {
};

export function setupWebSocket(server) {
    const wss = new WebSocketServer({server});

    wss.on('connection', async (ws) => {
        console.log('WebSocket verbunden');
        clients.add(ws);

        const sendUpdates = async () => {
            try {
                const [stocks] = await db.query('SELECT * FROM stocks');
                const updates = stocks.map(stock => {
                    const name = stock.name;
                    let last = lastPrices.get(name) || stock.market_value;
                    const next = getNextPrice(last);
                    db.query('UPDATE stocks SET market_value = ? WHERE name = ?', [next, name]);
                    lastPrices.set(name, next);
                    return {name, price: next};
                });

                updates.forEach(update => {
                    ws.send(JSON.stringify({
                        type: 'stock',
                        data: {name: update.name, price: update.price}
                    }));

                });
            } catch (err) {
                console.error('Fehler beim Senden der Updates:', err);
            }
        };

        const interval = setInterval(sendUpdates, 2000);

        ws.on('close', () => {
            clearInterval(interval);
            clients.delete(ws);
            console.log('WebSocket getrennt');
        });
    });

    wss.broadcastAlarm = (alarm) => {
        const msg = JSON.stringify({type: 'alert', data: alarm});
        for (const client of clients) {
            try {
                client.send(msg);
            } catch (err) {
                console.error('Fehler beim Senden des Alarms:', err);
            }
        }
    };

    broadcastAlarm = wss.broadcastAlarm;
}
