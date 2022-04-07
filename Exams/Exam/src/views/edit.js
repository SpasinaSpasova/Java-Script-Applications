import { html } from '../../node_modules/lit-html/lit-html.js';
import * as animalService from '../api/animal.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (animal, onSubmit) => html`
    <section id="editPage">
        <form @submit=${onSubmit} class="editForm">
            <img src="${animal.image}">
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" .value=${animal.name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" .value=${animal.breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" .value=${animal.age}>
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" .value=${animal.weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" .value=${animal.image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>`;

export async function editPage(ctx) {
    const animalId = ctx.params.id;
    const animal = await animalService.getById(animalId);

    ctx.render(editTemplate(animal, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const animalId = ctx.params.id;

    if (Object.values(data).some(x => x == '')) {
        return alert('All fields are required!');
    }

    await animalService.edit(animalId, {
        name: data.name,
        breed: data.breed,
        age: data.age,
        weight: data.weight,
        image: data.image    
    });

    event.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
}