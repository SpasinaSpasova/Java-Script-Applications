let userData = null;

window.addEventListener('DOMContentLoaded', (event) => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
    }
    else {
        document.getElementById('user').style.display = 'none';
    }

    document.querySelector('.load').addEventListener('click', loadData);
    document.getElementById('addForm').addEventListener('submit', onCreateSubmit);
});

async function onCreateSubmit(event) {
    event.preventDefault();
    if (!userData) {
        window.location = '././login.html'
        return;
    }
    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
    try {
        if (Object.values(data).some(x => x == '')) {
            throw new Error("Empty fields");
        }
        const response = await fetch(`http://localhost:3030/data/catches/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (response.ok != true) {
            const err = await response.json();
            throw new Error(err.message);
        }

        event.target.reset();
         loadData();

    } catch (error) {
        alert(error.message);
    }
}

async function loadData(event) {
    const response = await fetch(`http://localhost:3030/data/catches/`);
    const data = await response.json();

    document.getElementById('catches').replaceChildren(...data.map(createPreview));
}

function createPreview(item) {
    const isOwner = (userData && item._ownerId == userData.id);

    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML =
        `<label>Angler</label>
    <input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
    <label>Weight</label>
    <input type="text" class="weight" value="${item.weight}"${!isOwner ? 'disabled' : ''}>
    <label>Species</label>
    <input type="text" class="species" value="${item.species}"${!isOwner ? 'disabled' : ''}>
    <label>Location</label>
    <input type="text" class="location" value="${item.location}"${!isOwner ? 'disabled' : ''}>
    <label>Bait</label>
    <input type="text" class="bait" value="${item.bait}"${!isOwner ? 'disabled' : ''}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>
    <button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
    <button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''} ${addEventListener('click', deleteCatch)}>Delete</button>`;

    return element;
}