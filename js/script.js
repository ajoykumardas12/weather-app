let searchCity = document.querySelector('.search-city');

let city = document.querySelector('.weather-city');
let day = document.querySelector('.weather-day');
let humidity = document.querySelector('.today-humidity-value');
let wind = document.querySelector('.today-wind-value');
let pressure = document.querySelector('.today-pressure-value');
let image = document.querySelector('.weather-image');
let temperature = document.querySelector('.temperature-value');

let forecastBlock = document.querySelector('.weather-forecast');


// let weather = [1];


const apiKey = 'e27527bc4535e4b18a80d6d8647e808f';
const weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=' + apiKey;

async function getWeatherByCityName(city){
    let endpoint = weatherBaseEndpoint + '&q=' + city ;
    let response = await fetch(endpoint);

    let weather = await response.json();

    return weather;
}

getWeatherByCityName('Pandua');

searchCity.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchCity.value);
        updateTodayWeather(weather);

        let cityId = weather.id;
        let forecasts = await getForecastByCityId(cityId);
        updateForecast(forecasts);
    }
})

let date = new Date;
let updateTodayWeather = (data) => {
    console.log(data);
    console.log(data.weather[0]);
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity;
    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135) {
        windDirection = 'East';
    } else if(deg >135 && deg <= 225) {
        windDirection = 'South';
    } else if(deg >225 && deg <= 315) {
        windDirection = 'South';
    } else {
        windDirection = 'South';
    }
    wind.textContent = windDirection + ', ' + data.wind.speed;
    pressure.textContent = data.main.pressure;

    temperature.textContent = data.main.temp > 0 ? 
                    '+' + Math.round(data.main.temp) :
                     Math.round(data.main.temp);
}

let dayOfWeek = ( dt = new Date().getTime()) => {
    let options = {  weekday: 'long'};
    let weekDay = new Date(dt).toLocaleString('en-us', options);
    return weekDay; 
}


let forecastBaseEndPoint = 'https://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=' + apiKey;

async function getForecastByCityId(id) {
    let forecastEndpoint = forecastBaseEndPoint + '&id=' + id ;
    let forecastResponse = await fetch(forecastEndpoint);

    let forecast = await forecastResponse.json();
    let forecastList = forecast.list;
    let daily = [];

    forecastList.forEach( day => {
        let date = new Date(day.dt_txt.replace(' ', 'T'));
        let hours = date.getHours();
        if(hours === 12){
            daily.push(day);
        }
    })
    return daily;
}

let updateForecast = (forecast) => {
    forecastBlock.innerHTML = ' ';
    forecast.forEach( day => {
        daysWeather = day.weather[0];
        let iconUrl = 'http://openweathermap.org/img/wn/' + daysWeather.icon + '@2x.png';
        let dayName = dayOfWeek(day.dt * 1000);
        let dayTemp = day.main.temp;
        let temperature = dayTemp > 0 ? 
                    '+' + Math.round(dayTemp) :
                     Math.round(dayTemp);

        let forecastItem = `
            <article class="weather-forecast-item">
                <img src="${iconUrl}" alt=" " class="forecast-icon">
                <h4 class="forecast-day">${dayName}</h4>
                <p class="forecast-temperature"><span class="forecast-temperature-value">${temperature}</span> &deg;C</p>
            </article>
        `
        forecastBlock.insertAdjacentHTML('beforeend', forecastItem);
    })
}

