// routes/users.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Ottieni tutti gli utenti
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT id, username, email, role FROM users';
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Errore nel recupero degli utenti:', err);
        res.status(500).json({ error: 'Errore nel recupero degli utenti' });
    }
});

export default router;