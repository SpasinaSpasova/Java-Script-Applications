import { createIdea } from "../src/api/data";

const section = document.getElementById('createPage');
const form=section.querySelector('form');
form.addEventListener('submit',onSubmit);
let ctx=null;

export function showCreate(context) {
    ctx=context;

    context.showSection(section);
}

async function onSubmit(event){
    event.preventDefault();
    const formData=new formData(form);
    const title=formData.get('title');
    const description=formData.get('description');
    const img=formData.get('imageURL');

    await createIdea({
        title,
        description,
        img
    });
    form.reset();
    ctx.goto('/home');
}