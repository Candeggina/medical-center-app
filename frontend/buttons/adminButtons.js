document.addEventListener('DOMContentLoaded', () => {
    const contentWrapper = document.getElementById('content'); // Contenitore per i dati dinamici
    const navButtons = document.querySelectorAll('.nav-btn'); // Tutti i pulsanti della sidebar

    // Funzione per caricare il contenuto dinamico
    const loadContent = async (endpoint) => {
        try {
            const response = await fetch(`http://localhost:3000/api/${endpoint}`);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            const data = await response.json();
            renderContent(data, endpoint); // Renderizza i dati
        } catch (error) {
            console.error('Errore nel caricamento dei dati:', error);
            contentWrapper.innerHTML = `<p class="error">Errore nel caricamento dei dati. Riprova più tardi.</p>`;
        }
    };

    // Funzione per renderizzare il contenuto
    const renderContent = (data, endpoint) => {
        let html = '';

        switch (endpoint) {
            case 'appointments':
                html = `<h2>Appuntamenti</h2>
                         <table>
                             <thead>
                                 <tr>
                                     <th>Data</th>
                                     <th>Ora</th>
                                     <th>Luogo</th>
                                     <th>Paziente</th>
                                     <th>Medico</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 ${data.map(app => `
                                     <tr>
                                         <td>${app.date}</td>
                                         <td>${app.time}</td>
                                         <td>${app.location}</td>
                                         <td>${app.patient_name}</td>
                                         <td>${app.doctor_name}</td>
                                     </tr>
                                 `).join('')}
                             </tbody>
                         </table>`;
                break;

            case 'doctors':
                html = `<h2>Gestione Medici</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Specializzazione</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.map(doc => `
                                    <tr>
                                        <td>${doc.username}</td>
                                        <td>${doc.email}</td>
                                        <td>${doc.specialization}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>`;
                break;

            case 'users':
                html = `<h2>Gestione Utenti</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Ruolo</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.map(user => `
                                    <tr>
                                        <td>${user.username}</td>
                                        <td>${user.email}</td>
                                        <td>${user.role}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>`;
                break;

            case 'settings':
                html = `<h2>Impostazioni</h2>
                        <form id="settings-form">
                            <label for="theme">Tema:</label>
                            <select id="theme" name="theme">
                                <option value="light">Chiaro</option>
                                <option value="dark">Scuro</option>
                            </select>
                            <button type="submit">Salva</button>
                        </form>`;
                break;

            default:
                html = '<h1>Benvenuto nell\'Area Amministrativa</h1><p>Seleziona una voce dal menu laterale per iniziare</p>';
        }

        contentWrapper.innerHTML = html;
    };

    // Aggiungi event listener ai pulsanti
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Rimuovi la classe 'active' da tutti i pulsanti
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Aggiungi la classe 'active' al pulsante cliccato
            button.classList.add('active');
            // Carica il contenuto in base al pulsante cliccato
            const content = button.getAttribute('data-content');
            loadContent(content);
        });
    });

    // Gestione del form delle impostazioni
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'settings-form') {
            e.preventDefault();
            const theme = document.getElementById('theme').value;
            localStorage.setItem('theme', theme); // Salva il tema nel localStorage
            alert('Impostazioni salvate!');
        }
    });

    // Carica il tema salvato
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('theme').value = savedTheme;
    }
});