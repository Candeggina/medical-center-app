document.getElementById('loadDoctors').addEventListener('click', async () => {
    const content = document.getElementById('content');

    try {
        const response = await fetch('/api/doctors', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (!response.ok) throw new Error('Errore durante il recupero dei dati');

        const doctors = await response.json();

        if (doctors.length === 0) {
            content.innerHTML = `<p class="content-placeholder">Nessun medico trovato.</p>`;
        } else {
            content.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Specializzazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${doctors.map(doc => `
                            <tr>
                                <td>${doc.id}</td>
                                <td>${doc.name}</td>
                                <td>${doc.specialization}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } catch (error) {
        content.innerHTML = `<p class="content-placeholder">Errore durante il caricamento dei dati.</p>`;
        console.error(error);
    }
});

document.getElementById('logout').addEventListener('click', () => {
    if (confirm('Sei sicuro di voler uscire?')) {
        localStorage.clear();
        window.location.href = '../login.html';
    }
});
