import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { email, password } = req.body; // email e password inviate dal client

    // Esegui la query per trovare l'utente nel database
    const result = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const [rows] = result;

    // Se l'utente non esiste, restituisci un errore
    if (rows.length === 0) {
        return res.status(401).json({ error: 'Credenziali non valide' });
    }

    const user = rows[0]; // L'utente trovato

    // Confronta la password inserita con quella memorizzata nel database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        // Se la password è corretta, crea un token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET, // Chiave segreta per il token
            { expiresIn: '1h' } // Tempo di scadenza del token (1 ora in questo caso)
        );
        
        // Restituisci il token al client
        return res.json({ token });
    } else {
        // Se la password non è corretta, restituisci un errore
        return res.status(401).json({ error: 'Credenziali non valide' });
    }
};
