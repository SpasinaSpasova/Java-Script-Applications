import { createSubmitHandler } from '../util.js';
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as comentService from '../api/comment.js';

const commentsTemplate = (comments) => html`
<div class="details-comments">
    <h2>Comments:</h2>
    
    <ul>
        ${comments.map(previewTempl)}
    </ul>

    ${comments.length <= 0  
       ? html`<p class="no-comment">No comments.</p>`
        : nothing}
</div>
`;

const previewTempl = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;
export async function commentsView(gameId) {
    const comments = await comentService.getByGameId(gameId);
    return commentsTemplate(comments);
}
