import express from 'express';
import db from '../db.js';

const router = express.Router();

// Ottieni tutti gli appuntamenti (GET)
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT a.id, a.date, a.time, a.location, u1.username AS patient_name, u2.username AS doctor_name
            FROM appointments a
            JOIN users u1 ON a.user_id = u1.id
            JOIN users u2 ON a.doctor_id = u2.id
        `;
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Errore nel recupero degli appuntamenti:', err);
        res.status(500).json({ error: 'Errore nel recupero degli appuntamenti' });
    }
});

// Crea un nuovo appuntamento (POST)
router.post('/', async (req, res) => {
    try {
        const { user_id, doctor_id, date, time, location } = req.body;

        // Verifica che tutti i campi obbligatori siano presenti
        if (!user_id || !doctor_id || !date || !time || !location) {
            return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
        }

        // Inserisci il nuovo appuntamento nel database
        const query = `
            INSERT INTO appointments (user_id, doctor_id, date, time, location)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [user_id, doctor_id, date, time, location]);

        // Restituisci una risposta di successo
        res.status(201).json({
            message: 'Appuntamento creato con successo',
            appointmentId: result.insertId
        });
    } catch (err) {
        console.error('Errore nella creazione dell\'appuntamento:', err);
        res.status(500).json({ error: 'Errore nella creazione dell\'appuntamento' });
    }
});

export default router;