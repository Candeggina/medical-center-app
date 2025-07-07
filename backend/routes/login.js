const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) throw new Error('Email non trovata');
        
        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Credenziali non valide');

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        res.json({ token, role: user.role });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});