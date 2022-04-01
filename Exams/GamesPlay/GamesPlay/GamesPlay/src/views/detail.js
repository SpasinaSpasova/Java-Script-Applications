import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../api/games.js';
import { commentFormView } from './commentForm.js';
import { commentsView } from './comments.js';


const detailTemplate = (game, commentsSection, commentFormSection, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${game.imageUrl}" />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
            ${game.summary}
        </p>

        <!-- Bonus -->

        ${commentsSection}

        ${game.isOwner
        ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>`
        : nothing}
    </div>

    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${commentFormSection}

</section>`;

export async function detailPage(ctx) {
    const gameId = ctx.params.id;
    const [game, commentsSection] = await Promise.all([
        gameService.getById(gameId),
        commentsView(gameId)
    ]);

    
    if (ctx.user) {
        const isOwner = ctx.user._id == game._ownerId;
        game.isOwner = isOwner;
    }
    const commentFormSection = commentFormView(ctx,game.isOwner);
    ctx.render(detailTemplate(game, commentsSection, commentFormSection, onDelete));

    async function onDelete() {

        const check = confirm('Are you sure to delete this game?');

        if (check) {
            await gameService.deleteById(gameId);
            ctx.page.redirect('/');
        }
    }
}