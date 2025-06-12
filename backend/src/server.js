import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import {setupWebSocket} from './websocket.js';
import stocksRouter from './routes/stocks.js';
import authRouter from './routes/auth.js';
import setupSwagger from './swagger.js';
import {startAlertLoop} from './alarmChecker.js';
import {router as alertRouter} from './routes/alerts.js';

import {logRequest} from './logger.js';


dotenv.config();


const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/stocks', stocksRouter);
app.use('/api/alerts', alertRouter);
app.use(logRequest);

app.get('/', () => {
    return "Root"
})

setupWebSocket(server);

setupSwagger(app);

startAlertLoop();

server.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
