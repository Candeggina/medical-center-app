document.addEventListener('DOMContentLoaded', async () => {
    console.log('Pagina caricata'); // Debug

    // Verifica token e ruolo
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log('Token:', token); // Debug
    console.log('Ruolo:', role); // Debug

    function initEventListeners() {
        // Navigazione
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.nav-btn.active').classList.remove('active');
                btn.classList.add('active');
                switch (btn.dataset.content) {
                    case 'contacts':
                        loadContacts();
                        break;
                    case 'appointments':
                        loadAppointments();
                        break;
                    case 'prescriptions':
                        loadPrescriptions();
                        break;
                }
            });
        });

        // Logout
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '../login.html';
        });
    }

    function renderContacts(contacts) {
        const container = document.getElementById('content');
        container.innerHTML = `
            <div class="section-header">
                <h2>I Tuoi Contatti</h2>
                <button class="btn-primary" onclick="showContactForm()">
                    <i class="fas fa-plus"></i> Nuovo Contatto
                </button>
            </div>
            <div class="contacts-grid">
                ${contacts.map(contact => `
                    <div class="contact-card">
                        <div class="contact-info">
                            <h3>${contact.name}</h3>
                            <p>${contact.phone}</p>
                        </div>
                        <div class="contact-actions">
                            <button class="btn-icon" onclick="editContact(${contact.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon danger" onclick="deleteContact(${contact.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    window.showContactForm = () => {
        const formHTML = `
            <div class="modal">
                <div class="modal-content">
                    <h3>Nuovo Contatto</h3>
                    <input type="text" id="contactName" placeholder="Nome" required>
                    <input type="tel" id="contactPhone" placeholder="Telefono" required>
                    <div class="modal-actions">
                        <button class="btn-secondary" onclick="closeModal()">Annulla</button>
                        <button class="btn-primary" onclick="saveContact()">Salva</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', formHTML);
    };

    // Funzioni di utilità
    function closeModal() {
        document.querySelector('.modal').remove();
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert error';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

});