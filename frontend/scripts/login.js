document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Credenziali non valide');
        }

        const { token, role } = await response.json();

        // Salva il token e il ruolo nel localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Reindirizza in base al ruolo
        switch (role) {
            case 'admin':
                window.location.href = 'dashboard/admin.html';
                break;
            case 'doctor':
                window.location.href = 'dashboard/doctor.html';
                break;
            case 'pharma_rep':
                window.location.href = 'dashboard/pharma_rep.html';
                break;
            default:
                window.location.href = 'dashboard/patient.html';
        }

    } catch (error) {
        alert(error.message);
    }
});