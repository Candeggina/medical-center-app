import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Registrazione
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Verifica se l'email è già registrata
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email già registrata' });
        }

        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserimento utente con ruolo
        await db.execute(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role || 'patient'] // Default: 'patient'
        );

        res.status(201).json({ message: 'Registrazione completata' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore durante la registrazione' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se l'utente esiste
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        const user = users[0];

        // Verifica la password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        // Crea il token JWT con il ruolo
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token valido per 1 ora
        );

        // Invia il token e il ruolo al frontend
        res.json({ token, role: user.role });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore durante il login' });
    }
});

export default router;