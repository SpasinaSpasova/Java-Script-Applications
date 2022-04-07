import { html } from '../../node_modules/lit-html/lit-html.js';
import * as animalService from '../api/animal.js'

const dashboardTemplate = (animals) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${animals.length > 0
        ? animals.map(previewTemplate)
            : html`<div>
            <p class="no-pets">No pets in dashboard</p>
        </div>`}

    </div>
</section>`;

const previewTemplate = (animal) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${animal.image}">
    </article>
    <h2 class="name">${animal.name}</h2>
    <h3 class="breed">${animal.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${animal._id}">Details</a>
    </div>
</div>`;


export async function dashboardPage(ctx) {
    const allAnimals = await animalService.getAll();
    ctx.render(dashboardTemplate(allAnimals));
}