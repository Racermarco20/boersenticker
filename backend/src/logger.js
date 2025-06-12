import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFile = path.join(__dirname, '../logs/activity.log');

function logToFile(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) console.error('Fehler beim Schreiben in Log-Datei:', err);
    });
}

function logRequest(req, res, next) {
    const message = `${req.method} ${req.url} - ${req.ip}`;
    console.log(message);
    logToFile(message);
    next();
}

export {logRequest};
