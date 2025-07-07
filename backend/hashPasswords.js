import bcrypt from 'bcryptjs';

// Passwords da hashare
const passwords = [
    { id: 1, password: 'admin123' },
    { id: 2, password: 'doctor123' },
    { id: 3, password: 'patient123' }
];

// Hash delle password
passwords.forEach(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(`UPDATE users SET password = '${hashedPassword}' WHERE id = ${user.id};`);
});