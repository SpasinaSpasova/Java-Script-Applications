import { html } from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../api/meme.js';


const profileTemplate = (memes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${JSON.parse(localStorage.getItem('user')).gender}.png">
        <div class="user-content">
            <p>Username: ${JSON.parse(localStorage.getItem('user')).username}</p>
            <p>Email: ${JSON.parse(localStorage.getItem('user')).email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">

        ${memes.length > 0
            ? memes.map(previewTemplate)
                : html` <p class="no-memes">No memes in database.</p>`}

    </div>
</section>`

const previewTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export async function profilePage(ctx) {
//     let memes=await memeService.getAll();
//    memes= Object.values(memes).filter(x=>x._ownerId==JSON.parse(localStorage.getItem('user'))._id);

let memes= await memeService.getAllforUser();
    ctx.render(profileTemplate(memes));
}