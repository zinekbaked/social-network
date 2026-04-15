async function register() {
    const btn = document.getElementById('registerBtn');

    const data = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    btn.disabled = true;
    btn.textContent = 'Loading...';

    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            alert('Registered!');
            window.location.href = 'login.html';
        } else {
            alert(result.error || 'Register failed');
        }
    } catch (err) {
        alert('Server error');
    }

    btn.disabled = false;
    btn.textContent = 'Register';
}