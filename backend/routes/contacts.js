import express from 'express';
import db from '../db.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Crea un nuovo contatto (solo pazienti)
router.post('/', authenticateToken, authorizeRole(['patient']), async (req, res) => {
    try {
        const { name, phone } = req.body;
        const userId = req.user.id;

        await db.execute(
            'INSERT INTO contacts (user_id, name, phone) VALUES (?, ?, ?)',
            [userId, name, phone]
        );

        res.status(201).json({ message: 'Contatto creato' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore durante la creazione del contatto' });
    }
});

// Leggi tutti i contatti dell'utente (solo pazienti)
router.get('/', authenticateToken, authorizeRole(['patient']), async (req, res) => {
    try {
        const userId = req.user.id;
        const [contacts] = await db.execute('SELECT * FROM contacts WHERE user_id = ?', [userId]);

        res.json(contacts);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore durante il recupero dei contatti' });
    }
});

export default router;