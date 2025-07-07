document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '../login.html';

    try {
        // Verifica ruolo
        const userRes = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const user = await userRes.json();
        if (user.role !== 'pharma_rep') window.location.href = '../login.html';

        // Inizializza UI
        document.getElementById('pharmaName').textContent = user.username;
        initEventListeners();
        loadVisits();

    } catch (error) {
        handleError(error);
    }

    function initEventListeners() {
        // Navigazione
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.nav-btn.active').classList.remove('active');
                btn.classList.add('active');
                switch(btn.dataset.content) {
                    case 'visits': loadVisits(); break;
                    case 'products': loadProducts(); break;
                    case 'reports': generateReports(); break;
                }
            });
        });

        // Logout
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '../login.html';
        });
    }

    async function loadVisits() {
        try {
            const res = await fetch('/api/visits', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const visits = await res.json();
            renderVisits(visits);
            
        } catch (error) {
            showError('Errore caricamento visite');
        }
    }

    function renderVisits(visits) {
        const container = document.getElementById('content');
        container.innerHTML = `
            <div class="section-header">
                <h2>Visite Programmate</h2>
                <button class="btn-primary" onclick="showVisitForm()">
                    <i class="fas fa-plus"></i> Nuova Visita
                </button>
            </div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Dottore</th>
                            <th>Cliente</th>
                            <th>Stato</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${visits.map(visit => `
                            <tr>
                                <td>${new Date(visit.date).toLocaleDateString()}</td>
                                <td>${visit.doctor_name}</td>
                                <td>${visit.client}</td>
                                <td>
                                    <span class="status-badge ${visit.status.toLowerCase()}">
                                        ${visit.status}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn-icon" onclick="editVisit(${visit.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Funzioni di utilità
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert error';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

});