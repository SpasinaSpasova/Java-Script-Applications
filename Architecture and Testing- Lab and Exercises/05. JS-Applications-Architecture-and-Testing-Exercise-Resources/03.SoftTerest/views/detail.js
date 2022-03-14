const section = document.getElementById('detailPage');
import { getById,deleteById } from '../api/data.js';

export function showDetail(context, id) {
    const idea = await getById(id);
    context.showSection(section);

    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && user._id == idea._ownerId;

    section.innerHTML = createIdeaHTML(idea, isOwner);
    if (isOwner) {
        section.querySelector('#deleteBtn').
        addEventListener('click',async (event)=>{
            const choise=confirm('Are you sure?');
            if (choise) {
              await  deleteById(id);
              context.goto('/catalog');
            }
        })
    }
}

function createIdeaHTML(idea, isOwner) {
    let html = `<img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`;

    if (isOwner) {
        html += ` <div class="text-center">
        <a id= 'deleteBtn'class="btn detb" href="">Delete</a>
    </div>`

    }

    return html;
}


