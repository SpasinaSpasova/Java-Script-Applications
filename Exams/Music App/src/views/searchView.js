import { html } from '../../node_modules/lit-html/lit-html.js'
import * as albumService from '../services/albumService.js'
import {albumTemplate} from '../templates/albumTemplates.js'

const searchTemplate = (searchHandler, albums,isLoged) => html` 
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${searchHandler}>Search</button>
    </div>

    <h2>Results:</h2>

    <!--If there are no matches-->
    ${albums.length > 0
        ? albums.map(x => albumTemplate(x, isLoged))
    : html`<p class="no-result">No result.</p>`}

    </div>
</section>`;


export const searchView = (ctx) => {
    const searchHandler = (e) => {
        e.preventDefault();
        let searchElem = document.getElementById('search-input').value;

        albumService.search(searchElem)
            .then(albums => {
                let isLoged = Boolean(ctx.user);
                ctx.render(searchTemplate(searchHandler, albums, isLoged));
            });
    }
    ctx.render(searchTemplate(searchHandler, []));
}