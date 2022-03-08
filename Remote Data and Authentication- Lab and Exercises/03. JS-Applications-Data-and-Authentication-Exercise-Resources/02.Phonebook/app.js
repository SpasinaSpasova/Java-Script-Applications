function attachEvents() {
    const url = `http://localhost:3030/jsonstore/phonebook`;

    const ul = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    loadBtn.addEventListener('click', onClickLoad);
    createBtn.addEventListener('click',onClickCreate);

    async function onClickLoad(event) {
        ul.innerHTML='';
        const res = await fetch(url);
        const data = await res.json();
        const dataToShow = Object.values(data);

        for (const elem of dataToShow) {
            let li = document.createElement('li');
            li.textContent = `${elem.person}: ${elem.phone}`;
            li.setAttribute('id',elem._id);
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', onDelete);
            li.appendChild(deleteBtn);
            ul.appendChild(li);
        }
    }
    async function onDelete(event) {
        const id = event.target.parentNode.id;
        event.target.parentNode.remove();
        let url=`http://localhost:3030/jsonstore/phonebook/${id}`;
        await fetch(url,{
            method:'delete'
        });
    }
    async function onClickCreate(event){
        if(person.value !== '' && phone.value !== ''){
 
            const response = await fetch(url,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({person:person.value,phone:phone.value})
            });
            loadBtn.click();
 
            person.value = '';
            phone.value = '';
 
        }
    }
}

attachEvents();