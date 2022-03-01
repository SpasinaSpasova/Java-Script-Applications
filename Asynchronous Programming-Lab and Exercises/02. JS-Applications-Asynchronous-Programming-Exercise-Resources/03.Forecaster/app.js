function attachEvents() {
    let location = document.querySelector('#location');
    let button = document.querySelector('#submit');

    let url = `http://localhost:3030/jsonstore/forecaster/locations`;

    let symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176',
    };

    button.addEventListener('click', showForecast);
    async function showForecast(event) {

        //data inccorect format
        if (location.value == '' || location.value == undefined) {
           throw new Error('Error');
        }
        try {
            const fetchData = await fetch(url);
            const data = await fetchData.json();

            let currentInfo = data.find(e => e.name == location.value);
            if (!currentInfo) {
                throw new Error('Error');
            }
            else {
                //today forecast
                try {
                    const current = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${currentInfo.code}`);
                    const dataCurrent = await current.json();
                    //console.log(dataCurrent);
                    document.querySelector('#forecast').style.display = 'block';
                    document.querySelector('#forecast')
                        .innerHTML = '<div id="current"><div class="label">Current conditions</div></div><div id="upcoming"><div class="label">Three-day forecast</div></div>';

                    let divCurrent = document.getElementById('current');

                    let divForecasts = document.createElement('div');
                    divForecasts.classList.add('forecasts');

                    let spanConditionSymbol = document.createElement('span');
                    spanConditionSymbol.classList.add('condition');
                    spanConditionSymbol.classList.add('symbol');
                    spanConditionSymbol.innerHTML = symbols[dataCurrent.forecast.condition];

                    let spanConditions = document.createElement('span');
                    spanConditions.classList.add('condition');

                    let firstSpan = document.createElement('span');
                    firstSpan.classList.add('forecast-data');
                    firstSpan.textContent = dataCurrent.name;

                    let secondSpan = document.createElement('span');
                    secondSpan.classList.add('forecast-data');
                    secondSpan.textContent = dataCurrent.forecast.low + '°/' + dataCurrent.forecast.high + '°';

                    let thirdSpan = document.createElement('span');
                    thirdSpan.classList.add('forecast-data')
                    thirdSpan.textContent = dataCurrent.forecast.condition;

                    spanConditions.appendChild(firstSpan);
                    spanConditions.appendChild(secondSpan);
                    spanConditions.appendChild(thirdSpan);

                    divForecasts.appendChild(spanConditionSymbol);
                    divForecasts.appendChild(spanConditions);


                    divCurrent.appendChild(divForecasts);

                } catch (error) {
                    document.querySelector('#forecast').style.display='block';
                    document.querySelector('#forecast').innerHTML='ERROR';
                }

                //3-day forecast
                try {
                    const fetch3Day = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${currentInfo.code}`);
                    const threeDayData = await fetch3Day.json();
                    //console.log(threeDayData);

                    let divUpcoming = document.querySelector('#upcoming');
                    let divForecastInfo = document.createElement('div');
                    divForecastInfo.classList.add('forecast-info');
                    divUpcoming.appendChild(divForecastInfo);

                    threeDayData.forecast.forEach(element => {

                        let mainSpan = document.createElement('span');
                        mainSpan.classList.add('upcoming');

                        let span1 = document.createElement('span');
                        span1.classList.add('symbol');
                        span1.innerHTML = symbols[element.condition];

                        let span2 = document.createElement('span');
                        span2.classList.add('forecast-data');
                        span2.innerHTML = element.low + '°/' + element.high + '°';

                        let span3 = document.createElement('span');
                        span3.classList.add('forecast-data');
                        span3.innerHTML = element.condition;

                        mainSpan.appendChild(span1);
                        mainSpan.appendChild(span2);
                        mainSpan.appendChild(span3);

                        divForecastInfo.appendChild(mainSpan);
                    });

                } catch (error) {
                    document.querySelector('#forecast').style.display='block';
                    document.querySelector('#forecast').innerHTML='ERROR';
                }
            }
        } catch (error) {
            document.querySelector('#forecast').style.display='block';
            document.querySelector('#forecast').innerHTML='ERROR';
        }
    }

}

attachEvents();