import {WebSocketServer} from 'ws';
import {db} from './db.js';
import path from "path";
import fs from "fs";

const lastPrices = new Map();
const clients = new Set()

const logFilePath = path.join(process.cwd(), '/logs/stock-price-log.txt');

function getNextPrice(current) {

    const isBigChange = Math.random() < 0.05;
    const maxChange = isBigChange ? 0.10 : 0.02;
    const changePercent = (Math.random() * 2 - 1) * maxChange;

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
                    logPriceChange(name, last, next, (next - last) / last);
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

function logPriceChange(stockName, oldPrice, newPrice, changePercent) {
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] ${stockName}: ${oldPrice} € → ${newPrice} € (${(changePercent * 100).toFixed(2)}%)\n`;
    fs.appendFile(logFilePath, message, (err) => {
        if (err) console.error('Fehler beim Schreiben ins Logfile:', err);
    });
    console.log(message);
}
