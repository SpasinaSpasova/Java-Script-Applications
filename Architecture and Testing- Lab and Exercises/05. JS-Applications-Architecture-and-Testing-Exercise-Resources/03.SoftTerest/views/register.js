const section = document.getElementById('registerPage');
const form = document.querySelector('form');
import {register } from '../api/users.js';
form.addEventListener('submit', onSubmit);

let ctx = null;
export function showRegister(context) {
    ctx=context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData=new formData(form);

    const email=formData.get('email');
    const password=formData.get('password');

    await register(email,password);
    form.reset();
    ctx.updateNav();
    ctx.goto('/');
}