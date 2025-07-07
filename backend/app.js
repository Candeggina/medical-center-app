import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}));
app.use(express.json());

// Servi i file statici del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Route per la root
app.get('/', (req, res) => {
    res.send('Benvenuto al Medical Center API!');
});

// Import dinamico delle route
import('./routes/auth.js').then(module => {
    const authRoutes = module.default;
    app.use('/api/auth', authRoutes);
}).catch(err => console.error("Errore nel caricamento di auth.js:", err));

import('./routes/contacts.js').then(module => {
    const contactRoutes = module.default;
    app.use('/api/contacts', contactRoutes);
}).catch(err => console.error("Errore nel caricamento di contacts.js:", err));

import('./routes/appointments.js').then(module => {
    const appointmentRoutes = module.default;
    app.use('/api/appointments', appointmentRoutes);
}).catch(err => console.error("Errore nel caricamento di appointments.js:", err));

import('./routes/doctors.js').then(module => {
    const doctorRoutes = module.default;
    app.use('/api/doctors', doctorRoutes);
}).catch(err => console.error("Errore nel caricamento di doctors.js:", err));

import('./routes/users.js').then(module => {
    const userRoutes = module.default;
    app.use('/api/users', userRoutes);
}).catch(err => console.error("Errore nel caricamento di users.js:", err));

// Route "catch-all" per servire il frontend
// Questa deve essere l'ultima route definita
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});