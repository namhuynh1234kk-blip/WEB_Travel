const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const name = document.getElementById('name').value;

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    try {

        const res = await fetch(
            'http://localhost:3000/api/auth/register',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name,
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

        alert('Đăng ký thành công');

        window.location.href = './login.html';

    } catch (error) {

        console.log(error);
    }
});