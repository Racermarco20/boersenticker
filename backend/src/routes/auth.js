import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {db} from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registriert einen neuen Benutzer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Username already exists
 */
router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hash]);
        res.status(201).json({message: 'User registered'});
    } catch (err) {
        res.status(400).json({error: 'Username already exists'});
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Loggt einen Benutzer ein
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Erfolgreich eingeloggt (Token wird zurückgegeben)
 *       401:
 *         description: Ungültige Zugangsdaten
 */
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const [[user]] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) return res.status(401).json({error: 'Invalid credentials'});

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({error: 'Invalid credentials'});

    const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
});

export default router;
