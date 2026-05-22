const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    try {

        const res = await fetch(
            'http://localhost:3000/api/auth/login',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await res.json();

        if (!res.ok) {

            alert(data.message);

            return;
        }

        // SAVE TOKEN
        localStorage.setItem(
            'token',
            data.token
        );

        localStorage.setItem(
            'user',
            JSON.stringify(data.user)
        );

        alert('Đăng nhập thành công');

        window.location.href = '../index.html';

    } catch (error) {

        console.log(error);

    }
});