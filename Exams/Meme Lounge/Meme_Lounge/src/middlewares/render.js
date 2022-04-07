import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = () => html`
    <a href="/catalog">All Memes</a>
    ${localStorage.getItem('user')
    ? html`
    <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${JSON.parse(localStorage.getItem('user')).email}</span>
            <a href="/profile">My Profile</a>
            <a href="/logout">Logout</a>
        </div>
    </div>`
    : html`
    <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
    </div>`}
`;

const header = document.getElementById('navbar')

const root = document.getElementById('main-content');

function ctxRender(content) {
    render(content, root);
}

export function addRender(ctx, next) {
    
    render(navTemplate(), header);
    ctx.render = ctxRender;
    next();
}