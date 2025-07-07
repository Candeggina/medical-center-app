# 🏥 Medical Center - Gestione Appuntamenti Medici  
*Progetto scolastico full-stack con Html , Css , js , Node.js, Express e MySQL*  

![Anteprima Dashboard](https://i.imgur.com/hLuXcZZ.png)  

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

<div align="center" style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 2rem 0;">

<a href="https://nodejs.org/" target="_blank" style="margin: 0 7px;">
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
</a>

<a href="https://expressjs.com/" target="_blank" style="margin: 0 7px;">
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
</a>

<a href="https://www.mysql.com/" target="_blank" style="margin: 0 7px;">
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
</a>

<a href="https://jwt.io/" target="_blank" style="margin: 0 7px;">
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
</a>

</div>

## 🗄 Struttura Backend/Frontend
```plaintext
medical-center-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # Configurazione DB
│   │   │   └── jwt.js             # Configurazione JWT
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
│   └── package.json              
│
├── database/
│   └── medical_center.sql       # Dump SQL
│
└── README.md                    # Documentazione
```


## 🚀 Guida all'Installazione

### Prerequisiti
<a href="https://nodejs.org/" target="_blank">
  <img src="https://img.shields.io/badge/Node.js-v18+-339933?logo=nodedotjs&logoColor=white" alt="Node.js v18+">
</a>

<a href="https://www.mysql.com/" target="_blank">
  <img src="https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql&logoColor=white" alt="MySQL 8.0+">
</a>

<a href="https://git-scm.com/" target="_blank">
  <img src="https://img.shields.io/badge/Git-Required-F05032?logo=git&logoColor=white" alt="Git">
</a>

**Client database:**  
<a href="https://www.phpmyadmin.net/" target="_blank">
  <img src="https://img.shields.io/badge/phpMyAdmin-Recommended-6C78AF?logo=phpmyadmin&logoColor=white" alt="phpMyAdmin">
</a>

<a href="https://www.mysql.com/products/workbench/" target="_blank">
  <img src="https://img.shields.io/badge/MySQL_Workbench-Alternative-4479A1?logo=mysql&logoColor=white" alt="MySQL Workbench">
</a>

### 1. Clonazione del Repository
```bash
git clone https://github.com/Candeggina/medical-center-app.git
cd medical-center-app/backend
```

### 2. Configurazione Database  
- Importa `medical_center.sql` in phpMyAdmin  
- Crea/modifica il file `.env` con:  
  ```env
  DB_HOST=localhost
  DB_USER=tuo_user
  DB_PASS=tuo_password
  DB_NAME=medical_center
  JWT_SECRET=tua_chiave_segreta
  ```

### 3. Avvio Applicazione
```bash
node app.js
```

> Server disponibile all'indirizzo: `http://localhost:3000`


## 📚 Documentazione API  
| Endpoint           | Metodo | Descrizione                     |
|--------------------|--------|---------------------------------|
| `/api/auth/login`  | POST   | Autenticazione JWT              |
| `/api/appointments`| GET    | Lista appuntamenti              |
| `/api/doctors`     | GET    | Elenco medici per specializzazione |

> **Nota**: Questo progetto è stato sviluppato a scopo didattico.  