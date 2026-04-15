async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('loginBtn');

    btn.disabled = true;
    btn.textContent = 'Loading...';

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'wall.html';
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (err) {
        alert('Server error');
    }

    btn.disabled = false;
    btn.textContent = 'Login';
}