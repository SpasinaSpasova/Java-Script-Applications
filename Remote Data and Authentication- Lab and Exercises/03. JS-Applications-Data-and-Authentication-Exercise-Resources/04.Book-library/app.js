let btnLoadAll=document.querySelector('#loadBooks');
let table=document.querySelector('body > table');
let form=document.querySelector('body > form');

btnLoadAll.addEventListener('click', onClickLoadAll);
form.addEventListener('submit', onFormSubmit);

async function onClickLoadAll(event) {
    event.preventDefault();
    table.innerHTML='';
    try {      
        const url='http://localhost:3030/jsonstore/collections/books';
        const response = await fetch(url);        
        
        if (response.status !== 200 ) {       
            console.log('Invalid GET request');             
        }else{
            data = await response.json();                      
            for (const item of Object.entries(data)) {                            
                let newRow=table.insertRow();
                
                let cellTitle=newRow.insertCell();
                cellTitle.innerHTML=item[1].title;

                let cellAuthor=newRow.insertCell();
                cellAuthor.innerHTML=item[1].author;

                let cellButtons=newRow.insertCell();

                let btnEdit=e('button','Edit',null);
                btnEdit.setAttribute('id', item[0]);
                btnEdit.addEventListener('click', onEdit);
                cellButtons.appendChild(btnEdit);

                let btnDelete=e('button','Delete',null);
                btnDelete.setAttribute('id', item[0]);
                btnDelete.addEventListener('click', onDelete);
                cellButtons.appendChild(btnDelete);
            }
            
        }            
    }
    catch (err) {
        alert(err);       
    }    
}

async function onFormSubmit(event) {
    event.preventDefault();
    let formData=new FormData(event.target);
    
    let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
    let data=await response.json();

    document.querySelector('body > form > input[type=text]:nth-child(3)').value='';
    document.querySelector('body > form > input[type=text]:nth-child(5)').value='';
    btnLoadAll.click();
}

async function onEdit(event){
    event.preventDefault();
    document.querySelector('body > form > h3').textContent='Edit FORM';
    const id=event.target.id;
    try {                    
        const response = await fetch('http://localhost:3030/jsonstore/collections/books/'+id);
        let data=await response.json();
        document.querySelector('body > form > input[type=text]:nth-child(3)').value=data.title;
        document.querySelector('body > form > input[type=text]:nth-child(5)').value=data.author;
        document.querySelector('body > form > button').textContent='Save';
        //set id to form in order to know which record to update
        document.querySelector('body > form').setAttribute('id', id);
        //remove event listener on the form to prevent submission
        form.removeEventListener('submit', onFormSubmit);
        form.addEventListener('submit', onFormSave);
    }
    catch (err) {
        alert(err.message);            
    }
}

async function onFormSave(event) {
    event.preventDefault();
    const id=event.target.id;
    try {   
        let newTitle=document.querySelector('body > form > input[type=text]:nth-child(3)').value;
        let newAuthor=document.querySelector('body > form > input[type=text]:nth-child(5)').value;
        
        let response = await fetch('http://localhost:3030/jsonstore/collections/books/'+id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title:newTitle, author:newAuthor})
        });
        form.removeAttribute('id');
        document.querySelector('body > form > input[type=text]:nth-child(3)').value='';
        document.querySelector('body > form > input[type=text]:nth-child(5)').value='';
        document.querySelector('body > form > button').textContent='Submit';
        document.querySelector('body > form > h3').textContent='FORM';

        form.removeEventListener('submit', onFormSave);
        form.addEventListener('submit', onFormSubmit);        

        btnLoadAll.click();
    }
    catch (err) {
        alert(err);            
    }
}

async function onDelete(event){
    event.preventDefault();    
        const idToBeDeleted=event.target.id;
        event.target.parentNode.parentNode.remove();
        try {                    
            const response = await fetch('http://localhost:3030/jsonstore/collections/books/'+idToBeDeleted, {
                    method: 'DELETE'
                });              
        }
        catch (err) {
            alert(err.message);            
        }
}

function e(type, content, className){
    const result= document.createElement(type);
    result.textContent=content;
    if (className) {
        result.className=className;
    }
    return result;
}  