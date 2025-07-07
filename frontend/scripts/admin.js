document.getElementById('logout').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../login.html';
});

document.getElementById('viewAppointments').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Token non disponibile. Effettua il login.');
        window.location.href = '../login.html';
        return;
    }

    try {
        const response = await fetch('/api/appointments', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Errore nel recupero degli appuntamenti.');
        }

        const appointments = await response.json();
        const content = document.getElementById('content');

        if (appointments.length === 0) {
            content.innerHTML = '<p>Nessun appuntamento trovato.</p>';
        } else {
            content.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Orario</th>
                            <th>Luogo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appointments.map(appointment => `
                            <tr>
                                <td>${appointment.id}</td>
                                <td>${appointment.date}</td>
                                <td>${appointment.time}</td>
                                <td>${appointment.location}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('manageDoctors').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/doctors');

        if (!response.ok) {
            throw new Error('Errore nel recupero dei medici.');
        }

        const doctors = await response.json();
        const content = document.getElementById('content');
        content.innerHTML = '<h2>Elenco Medici</h2>';
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
            </tr>
        `;
        doctors.forEach(doctor => {
            table.innerHTML += `
                <tr>
                    <td>${doctor.id}</td>
                    <td>${doctor.name}</td>
                    <td>${doctor.email}</td>
                </tr>
            `;
        });
        content.appendChild(table);
    } catch (error) {
        alert(error.message);
    }
});
