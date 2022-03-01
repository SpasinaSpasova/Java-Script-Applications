async function lockedProfile() {
    let main = document.querySelector('#main');
    main.innerHTML = '';

    try {
        const url = `http://localhost:3030/jsonstore/advanced/profiles`;
        const fetchData = await fetch(url);
        const data = await fetchData.json();

        for (const profile of Object.entries(data)) {
            let div = document.createElement('div');
            div.classList.add('profile');
            const profileInfo =
                `<img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${profile[0]}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${profile[0]}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${profile[0]}Username" value="${profile[1].username}" disabled readonly />
            <div class="hiddenInfo" disabled readonly>
                <hr>
                <label>Email:</label>
                <input type="email" name="user${profile[0]}Email" value="${profile[1].email}"/>
                <label>Age:</label>
                <input type="email" name="user${profile[0]}Age" value="${profile[1].age}"/>
            </div>
            <button>Show more</button>`;

            div.innerHTML += profileInfo;
            main.appendChild(div);
        }

    } catch (error) {
        console.log('Error');
    }

    let allButtons = Array.from(document.querySelectorAll('button'));

    allButtons.forEach(b => {
        b.addEventListener('click', function showInfo(event) {
            let currentRatio = event.target.parentElement.querySelector('input[type="radio"]');
            let currentButton = event.target;

            if (currentRatio.checked == false && currentButton.textContent == 'Show more') {

                currentButton.parentNode.children[9].style.display = 'block';
                currentButton.parentNode.children[9].classList.remove('hiddenInfo');
                currentButton.textContent = 'Hide it';
            }
            else if (currentRatio.checked == false && currentButton.textContent == 'Hide it') {
                currentButton.parentNode.children[9].style.display = 'none';
                currentButton.textContent = 'Show more'
            }
        });
    });
}