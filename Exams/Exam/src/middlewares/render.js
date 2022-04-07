import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = () => html`
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <!--Users and Guest-->
        <li><a href="/home">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>

        ${localStorage.getItem('user')
        ? html`
        <li><a href="/create">Create Postcard</a></li>
        <li><a href="/logout">Logout</a></li>`
        : html`
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`}

    </ul>
</nav>
`;

const header = document.getElementById('my-header')

const root = document.getElementById('content');

function ctxRender(content) {
    render(content, root);
}

export function addRender(ctx, next) {
    render(navTemplate(), header);
    ctx.render = ctxRender;
    next();
}