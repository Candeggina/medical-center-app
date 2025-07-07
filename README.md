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

## 🗄 Struttura Backend/Frontend
medical-center-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # Configurazione DB
│   │   │   └── jwt.js            # Configurazione JWT
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── appointmentController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js  # JWT + controllo ruoli
│   │   ├── models/
│   │   │   └── User.js           # Schemi DB
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── apiRoutes.js      # Tutte le API (/api/*)
│   │   ├── utils/
│   │   │   ├── hashPassword.js
│   │   │   └── emailService.js   # Future notifiche
│   │   └── app.js                # Entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/                   # File statici (HTML)
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   ├── auth.css      # Unificato login/register
│   │   │   │   └── dashboard.css
│   │   │   └── js/
│   │   │       ├── modules/      # Logiche separate
│   │   │       │   ├── auth/
│   │   │       │   │   ├── login.js
│   │   │       │   │   └── register.js
│   │   │       │   └── dashboard/
│   │   │       │       ├── admin.js
│   │   │       │       └── doctor.js
│   │   │       └── main.js       # Init globale
│   │   ├── dashboard/
│   │   │   └── [role].html       # Admin/Doctor/Patient
│   │   ├── auth/
│   │   │   ├── login.html
│   │   │   └── register.html
│   │   └── index.html
│   └── package.json              # (Se usi build tool)
│
├── database/
│   └── medical_center.sql       # Dump SQL
│
└── README.md                    # Documentazione


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