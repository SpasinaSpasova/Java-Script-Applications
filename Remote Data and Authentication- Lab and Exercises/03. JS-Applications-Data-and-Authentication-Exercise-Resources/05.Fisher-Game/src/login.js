window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);
});
async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get('email');
    let password = formData.get('password');

    try {
        let response = await fetch(`http://localhost:3030/users/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok !== true) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const data = await response.json();
        const userData = {
            email: data.email,
            id: data._id, token:
                data.accessToken
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = '././index.html';

    } catch (error) {
        alert(error.message);
    }
}
