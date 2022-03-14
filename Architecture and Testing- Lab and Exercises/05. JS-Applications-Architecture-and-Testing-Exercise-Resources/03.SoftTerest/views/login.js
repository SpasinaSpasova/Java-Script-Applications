import {login } from '../api/users.js';

const section = document.getElementById('loginPage');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);


let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData=new formData(form);

    const email=formData.get('email');
    const password=formData.get('password');

    await login(email,password);
    form.reset();
    ctx.updateNav();
    ctx.goto('/');
}