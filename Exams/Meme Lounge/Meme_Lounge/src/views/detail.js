import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../api/meme.js';


const detailTemplate = (meme, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            ${JSON.parse(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))._id == meme._ownerId)
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete}class="button danger">Delete</button>`
        : nothing}


        </div>
    </div>
</section>`;

export async function detailPage(ctx) {

    const memeId = ctx.params.id;
    const meme = await memeService.getById(memeId);

    // if (ctx.user) {
    //     const isOwner = ctx.user._id == meme._ownerId;
    //     meme.isOwner = isOwner;
    // }
    ctx.render(detailTemplate(meme, onDelete));

    async function onDelete() {

        const check = confirm('Are you sure to delete this game?');

        if (check) {
            await memeService.deleteById(memeId);
            ctx.page.redirect('/catalog');
        }
    }
}