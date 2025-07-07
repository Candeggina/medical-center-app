document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Errore durante la registrazione');
        }

        alert('Registrazione completata! Puoi accedere ora.');
        window.location.href = 'login.html';

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
        console.error('Errore durante la registrazione:', error);
    }
});