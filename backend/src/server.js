import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import {setupWebSocket} from './websocket.js';
import stocksRouter from './routes/stocks.js';
import authRouter from './routes/auth.js';
import setupSwagger from './swagger.js';


dotenv.config();
const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/stocks', stocksRouter);

setupWebSocket(server);

setupSwagger(app);

server.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
