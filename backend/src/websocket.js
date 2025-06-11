import {WebSocketServer} from 'ws';
import {db} from './db.js';

const lastPrices = new Map();

function getNextPrice(current) {
    const changePercent = (Math.random() * 0.1) - 0.05; // -5% bis +5%
    const newPrice = current * (1 + changePercent);
    return parseFloat(newPrice.toFixed(2));
}

export function setupWebSocket(server) {
    const wss = new WebSocketServer({server});

    wss.on('connection', async (ws) => {
        console.log('WebSocket verbunden');

        const sendUpdates = async () => {
            try {
                const [stocks] = await db.query('SELECT * FROM stocks');

                const updates = stocks.map(stock => {
                    const name = stock.name;

                    let last = lastPrices.get(name);
                    if (!last) {
                        last = stock.market_value;
                    }

                    const next = getNextPrice(last);
                    db.query('UPDATE stocks SET market_value = ? WHERE name = ?', [next, name]);
                    lastPrices.set(name, next);

                    return {
                        name,
                        price: next
                    };
                });

                updates.forEach(update => {
                    ws.send(JSON.stringify(update));
                });
            } catch (err) {
                console.error('Fehler beim Senden der Updates:', err);
            }
        };

        const interval = setInterval(sendUpdates, 2000);

        ws.on('close', () => {
            clearInterval(interval);
            console.log('WebSocket getrennt');
        });
    });
}
