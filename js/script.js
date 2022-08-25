let searchCity = document.querySelector('.search-city');

let city = document.querySelector('.weather-city');
let day = document.querySelector('.weather-day');
let humidity = document.querySelector('.today-humidity-value');
let wind = document.querySelector('.today-wind-value');
let pressure = document.querySelector('.today-pressure-value');
let image = document.querySelector('.weather-image');
let temperature = document.querySelector('.temperature-value');


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
    }
})

let date = new Date;
let updateTodayWeather = (data) => {
    console.log(data);
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

let dayOfWeek = () => {
    let options = {  weekday: 'long'};
    let weekDay = new Date().toLocaleString('en-us', options);

    return weekDay; 
}
