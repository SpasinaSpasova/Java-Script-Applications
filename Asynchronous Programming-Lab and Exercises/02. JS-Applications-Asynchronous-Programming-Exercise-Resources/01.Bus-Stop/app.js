async function getInfo() {
    let stopId = document.getElementById('stopId').value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    let stopName = document.getElementById('stopName');
    let valid = [1287, 1308, 1327, 2334];
    let busesUl = document.getElementById('buses');

    try {
        busesUl.innerHTML = '';

        if (!valid.includes(Number(stopId)) || isNaN(Number(stopId)) || Number(stopId) == '') {
            throw new Error('Error');
        }
        
        const fetchData = await fetch(url);
        if (fetchData.status !== 200) {
            throw new Error('Error');
        }
        let data = await fetchData.json();
        stopName.textContent = data.name;
        
        for (const [key, value] of Object.entries(data.buses)) {
            let liElement = document.createElement('li');
            liElement.textContent = `Bus ${key} arrives in ${value} minutes`;
            busesUl.appendChild(liElement);
        }

    } catch (error) {
        stopName.textContent = 'Error';
    }
}