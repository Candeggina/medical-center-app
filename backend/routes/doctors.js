// routes/doctors.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Ottieni tutti i medici
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT u.id, u.username, u.email, d.specialization
            FROM doctors d
            JOIN users u ON d.user_id = u.id
        `;
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Errore nel recupero dei medici:', err);
        res.status(500).json({ error: 'Errore nel recupero dei medici' });
    }
});

export default router;