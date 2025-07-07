# 🏥 Medical Center - Gestione Appuntamenti Medici  
*Progetto scolastico full-stack con Node.js, Express e MySQL*  

![Anteprima Dashboard](https://via.placeholder.com/800x400?text=Schermata+Login+%2B+Dashboard)  

## 📌 Stato del Progetto  
**Backend completo (~60%)** | **Frontend parziale (~40%)**  

### ✅ Funzionalità Implementate  
✔ **Autenticazione JWT** con 4 ruoli (admin, medico, paziente, informatore)  
✔ **API REST** documentate (auth, appointments, doctors, users)  
✔ **Database relazionale** con 5 tabelle correlate  
✔ **Hash password** con bcrypt  
✔ **Middleware** per controllo accessi  
✔ **Frontend base** (login, registrazione, dashboard)  

### 🚧 Work in Progress  
◻ Completamento interfaccia prenotazioni  
◻ Gestione notifiche email  
◻ Ottimizzazione mobile  

## 🛠 Stack Tecnologico  
```  
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)  
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)  
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)  
![JWT](https://img.shields.io/badge/JWT-Auth-orange)  
```  

## 🗄 Struttura Backend  
backend/
├── middleware/
│   └── auth.js          # Middleware autenticazione JWT
├── node_modules/        # Dipendenze (escluso da Git)
├── public/              # File statici (se presenti)
├── routes/
│   ├── appointments.js  # Route appuntamenti
│   ├── auth.js          # Route autenticazione
│   ├── contacts.js      # Route contatti
│   ├── doctors.js       # Route medici
│   ├── login.js         # Route login (ridondante con auth.js?)
│   └── users.js         # Route utenti
├── .env                 # Variabili d'ambiente (ESCLUSO DA GIT)
├── app.js               # File principale Express
├── db.js                # Connessione al database
├── hashPasswords.js     # Utility hashing password
├── package.json         # Dipendenze e script
├── package-lock.json    # Lock dipendenze
└── verifyhash.js        # Verifica password hashata


## 🗄 Struttura Frontend
frontend/
├── buttons/
│   └── adminButtons.js  # Logica pulsanti admin
├── dashboard/
│   ├── admin.html       # Dashboard admin
│   ├── doctor.html      # Dashboard medico
│   ├── patient.html     # Dashboard paziente
│   └── pharma_rep.html  # Dashboard informatore
├── scripts/
│   ├── admin.js         # Logica admin
│   ├── auth.js          # Autenticazione
│   ├── contacts.js      # Gestione contatti
│   ├── doctor.js        # Logica medico
│   ├── login.js         # Logica login
│   ├── patient.js       # Logica paziente
│   ├── pharma_rep.js    # Logica informatore
│   └── register.js      # Registrazione
├── styles/
│   ├── contacts.css     # Stile contatti
│   ├── dashboard.css    # Stile dashboard
│   ├── login.css        # Stile login
│   ├── register.css     # Stile registrazione
│   ├── style.css        # Stili globali
│   ├── styles.css       # Ridondante con style.css?
│   └── welcome.css      # Stile pagina welcome
├── contacts.html        # Pagina contatti
├── forgot-password.html # Recupero password
├── index.html           # Homepage
├── login.html           # Pagina login
└── register.html        # Pagina registrazione


## 🚀 Come Avviare il Progetto  
1. **Clona il repository**  
   ```bash
   git clone https://github.com/Candeggina/medical-center-app.git
   cd medical-center-app/backend
   ```

2. **Configura il database**  
   - Importa `medical_center.sql` in phpMyAdmin  
   - Crea un file `.env` con:  
     ```
     DB_HOST=localhost
     DB_USER=tuo_user
     DB_PASS=tuo_password
     DB_NAME=medical_center
     JWT_SECRET=tua_chiave_segreta
     ```

3. **Installa e avvia**  
   ```bash
   npm install
   npm start
   ```

4. **Accedi al frontend**  
   Apri `http://localhost:3000` nel browser  

## 📚 Documentazione API  
| Endpoint           | Metodo | Descrizione                     |
|--------------------|--------|---------------------------------|
| `/api/auth/login`  | POST   | Autenticazione JWT              |
| `/api/appointments`| GET    | Lista appuntamenti              |
| `/api/doctors`     | GET    | Elenco medici per specializzazione |

> **Nota**: Questo progetto è stato sviluppato a scopo didattico.  
> Il backend è completamente funzionante, mentre il frontend necessita di ulteriori sviluppi.

---

### 💡 Per Collaborare  
1. Forka il repository  
2. Crea un branch per le tue modifiche  
3. Apri una Pull Request descrivendo le migliorie  

**Crediti**: Sviluppato da [Il Tuo Nome] con Node.js e Express  
```

### Perché questa struttura funziona?
1. **Chiarezza sullo stato**: Differenzia nettamente ciò che è completo da ciò che è in sviluppo
2. **Visualizzazione tecnica**: Diagrammi e badge rendono immediato capire lo stack
3. **Istruzioni precise**: Passaggi dettagliati per il setup
4. **Professionalità**: Formattazione coerente e linguaggio tecnico ma accessibile

**Consiglio finale**: Aggiungi screenshot reali delle interfacce esistenti al posto del placeholder!