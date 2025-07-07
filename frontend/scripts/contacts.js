document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const contactsList = document.getElementById('contactsList');
    const contactForm = document.getElementById('contactForm');

    if (!token) {
        alert('Accesso negato');
        window.location.href = 'login.html';
    }

    // Carica contatti
    async function loadContacts() {
        const response = await fetch('/api/contacts', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const contacts = await response.json();
        contactsList.innerHTML = contacts.map(contact => `
            <div class="contact-item">
                <span>${contact.name} - ${contact.phone}</span>
                <button onclick="deleteContact(${contact.id})">Elimina</button>
            </div>
        `).join('');
    }

    // Aggiungi contatto
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, phone })
        });

        loadContacts();
    });

    // Elimina contatto
    window.deleteContact = async (id) => {
        await fetch(`/api/contacts/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });

        loadContacts();
    };

    // Logout
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'login.html';
    });

    loadContacts();
});