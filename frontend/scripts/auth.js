document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const { token, role } = await response.json();
            localStorage.setItem('token', token);
            if (role === 'admin') window.location.href = 'dashboard/admin.html';
        } else {
            alert('Credenziali errate');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Errore di connessione. Riprova.');
    }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            alert('Registrazione completata! Puoi accedere ora.');
            window.location.href = 'login.html';
        } else {
            alert('Errore nella registrazione. Riprova.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Errore di connessione. Riprova.');
    }
});
