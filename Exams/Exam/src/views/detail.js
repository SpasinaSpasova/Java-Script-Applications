import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as animalService from '../api/animal.js';

const detailTemplate = (animal,onDelete,onClick) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${animal.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${animal.name}</h1>
                <h3>Breed: ${animal.breed}</h3>
                <h4>Age: ${animal.age}</h4>
                <h4>Weight: ${animal.weight}</h4>
                <h4 class="donation">Donation: ${donation}$</h4>
            </div>
            ${localStorage.getItem('user')
        ? html`
            <div class="actionBtn">
                <!-- Only for registered user and creator of the pets-->
                ${localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))._id == animal._ownerId
                    ? html`
                <a href="/edit/${animal._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
                :nothing}
                ${localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))._id != animal._ownerId
            ?html`
            <a @click=${onClick} href="/details/${animal._id}" class="donate">Donate</a>`
            :nothing}
            </div>`
        : nothing}

        </div>
    </div>
</section>`

let donation=0;
export async function detailPage(ctx) {
     const animalId = ctx.params.id;
    const animal = await animalService.getById(animalId);

    ctx.render(detailTemplate(animal,onDelete,onClick));

    async function onDelete() {

        const check = confirm('Are you sure to delete this game?');

        if (check) {
            await animalService.deleteById(animalId);
            ctx.page.redirect('/');
        }
    }

    async function onClick(){
        let donateButton=document.querySelector('.donate');
        donateButton.style.display='none';

       await animalService.donate({animalId})
        // donation=donation+100;
        let donationIncreese=document.querySelector('.donation');
        const  result = await fetch(`http://localhost:3030/data/donation?where=petId%3D%22${animalId}%22&distinct=_ownerId&count`);
      const don = await result.json();
        donationIncreese.textContent=`Donation: ${don}$`;
    }


}

