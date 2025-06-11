import express from 'express';
import {db} from '../db.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

/**
 * @swagger
 * /stocks:
 *   get:
 *     summary: Gibt alle Aktien zurück
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste aller Aktien
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *       401:
 *         description: Ungültiger oder fehlender Token
 *       500:
 *         description: Datenbankfehler
 */

router.get('/', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM stocks');
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: 'DB Error'});
    }
});

export default router;
