function solve() {
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');
    let infoDiv = document.querySelector('.info');

    let info = {
        next: 'depot'
    }

    let data;

    async function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${info.next}`;
        const fetchData = await fetch(url);

        try {
            if (fetchData.status !== 200) {
                throw new Error('Error');
            }
            if(fetchData.status!==200){
                throw new Error('Error');
            }
            data = await fetchData.json();
            info.next = data.next;
            infoDiv.textContent = `Next stop ${data.name}`;
            departButton.disabled = true;
            arriveButton.disabled = false;
        } catch (error) {
            infoDiv.textContent = 'Error';
        }

    }

    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;
        infoDiv.textContent = `Arriving at ${data.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();