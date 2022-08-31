let searchCity = document.querySelector('.search-city');
let suggestions = document.querySelector('#suggestions');
let searchInput = document.getElementById('search-city');

let city = document.querySelector('.weather-city');
let day = document.querySelector('.weather-day');
let humidity = document.querySelector('.today-humidity-value');
let wind = document.querySelector('.today-wind-value');
let pressure = document.querySelector('.today-pressure-value');
let image = document.querySelector('.weather-image');
let temperature = document.querySelector('.temperature-value');
let condition = document.querySelector('.weather-condition');

let forecastBlock = document.querySelector('.weather-forecast');

let alertContainer = document.querySelector('.alert-container');
let closeAlertButton = document.querySelector('.close-button');

let weatherImagesDay = [
    {
        url: 'assets/meteocons/fill/clear-day.svg',
        ids: [800]
    },
    {
        url: 'assets/meteocons/fill/partly-cloudy-day.svg',
        ids: [803, 804]
    },
    {
        url: 'assets/meteocons/fill/rain.svg',
        ids: [500, 501, 502, 503, 504]
    },
    {
        url: 'assets/meteocons/fill/thunderstorms.svg',
        ids: [210, 211, 212, 221]
    },
    {
        url: 'assets/meteocons/fill/thunderstorms-rain.svg',
        ids: [200, 201, 202,  230, 231, 232]
    },
    {
        url: 'assets/meteocons/fill/drizzle.svg',
        ids: [300,301, 302, 310, 311, 312, 313, 314, 321]
    },
    {
        url: 'assets/meteocons/fill/snow.svg',
        ids: [600, 601, 602]
    },
    {
        url: 'assets/meteocons/fill/sleet.svg',
        ids: [611, 612, 613, 615, 616, 620, 621, 622]
    },
    {
        url: 'assets/meteocons/fill/mist.svg',
        ids: [701]
    },
    {
        url: 'assets/meteocons/fill/smoke.svg',
        ids: [711]
    },
    {
        url: 'assets/meteocons/fill/haze.svg',
        ids: [721]
    },
    {
        url: 'assets/meteocons/fill/dust.svg',
        ids: [731, 751, 761, ]
    },
    {
        url: 'assets/meteocons/fill/fog.svg',
        ids: [741]
    },
    {
        url: 'assets/meteocons/fill/tornado.svg',
        ids: [771, 781]
    },
    {
        url: 'assets/meteocons/fill/clear-day.svg',
        ids: [800]
    },
    {
        url: 'assets/meteocons/fill/partly-cloudy-day.svg',
        ids: [801, 802]
    },
    {
        url: 'assets/meteocons/fill/cloudy.svg',
        ids: [803]
    },
    {
        url: 'assets/meteocons/fill/overcast.svg',
        ids: [804]
    },
]
let weatherImagesNight = [
    {
        url: 'assets/meteocons/fill/clear-night.svg',
        ids: [800]
    },
    {
        url: 'assets/meteocons/fill/partly-cloudy-night.svg',
        ids: [803, 804]
    },
    {
        url: 'assets/meteocons/fill/rain.svg',
        ids: [500, 501, 502, 503, 504]
    },
    {
        url: 'assets/meteocons/fill/thunderstorms-night.svg',
        ids: [210, 211, 212, 221]
    },
    {
        url: 'assets/meteocons/fill/thunderstorms-night-rain.svg',
        ids: [200, 201, 202,  230, 231, 232]
    },
    {
        url: 'assets/meteocons/fill/drizzle.svg',
        ids: [300,301, 302, 310, 311, 312, 313, 314, 321]
    },
    {
        url: 'assets/meteocons/fill/snow.svg',
        ids: [600, 601, 602]
    },
    {
        url: 'assets/meteocons/fill/sleet.svg',
        ids: [611, 612, 613, 615, 616, 620, 621, 622]
    },
    {
        url: 'assets/meteocons/fill/mist.svg',
        ids: [701]
    },
    {
        url: 'assets/meteocons/fill/smoke.svg',
        ids: [711]
    },
    {
        url: 'assets/meteocons/fill/haze-night.svg',
        ids: [721]
    },
    {
        url: 'assets/meteocons/fill/dust-night.svg',
        ids: [731, 751, 761, ]
    },
    {
        url: 'assets/meteocons/fill/fog-night.svg',
        ids: [741]
    },
    {
        url: 'assets/meteocons/fill/tornado.svg',
        ids: [771, 781]
    },
    {
        url: 'assets/meteocons/fill/clear-night.svg',
        ids: [800]
    },
    {
        url: 'assets/meteocons/fill/partly-cloudy-night.svg',
        ids: [801, 802]
    },
    {
        url: 'assets/meteocons/fill/cloudy.svg',
        ids: [803]
    },
    {
        url: 'assets/meteocons/fill/overcast-night.svg',
        ids: [804]
    },
]

function hrFromMs(duration) {
    let hours = duration / (1000*60*60);
    let hr = hours % 24 ;
    return hr;
}

//alert box - city not found
let cityNotFound = () => {
    alertContainer.classList.remove('no-display');
    alertContainer.classList.remove('hide');
    alertContainer.classList.add('show');

    setTimeout(function(){
        alertContainer.classList.remove('show');
        alertContainer.classList.add('hide');
    },5000);

    closeAlertButton.addEventListener("click", () => {
        alertContainer.classList.remove('show');
        alertContainer.classList.add('hide');
    });
};


const apiKey = 'e27527bc4535e4b18a80d6d8647e808f';
const weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=' + apiKey;

let weatherForTheCity = async (theCity) => {
    let weather = await getWeatherByCityName(theCity);
    if(!weather) {
        return;
    }

    updateTodayWeather(weather);

    let cityId = weather.id;
    let forecasts = await getForecastByCityId(cityId);
    updateForecast(forecasts);
}

let init = () => {
    weatherForTheCity('Kolkata').then(() => document.body.style.filter = 'blur(0)')
}
init();

async function getWeatherByCityName(cityString){
    if(cityString.includes(',')) {
        theCity = cityString.substring(0, cityString.indexOf(',')) + cityString.substring(cityString.lastIndexOf(','));
    } else {
        theCity = cityString;
    }
    let endpoint = weatherBaseEndpoint + '&q=' + theCity ;
    let response = await fetch(endpoint);
    if(response.status !== 200) {
        cityNotFound();
        return;
    }
    let weather = await response.json();

    return weather;
}

//search directly from datalist - doesn't work on all browsers, eg. firefox
const opts = document.getElementById('suggestions').childNodes;
let eventSource = null;
let value = '';

searchCity.addEventListener('keydown', (e) => {
  eventSource = e.key ? 'input' : 'list';
});
searchCity.addEventListener('input', (e) => {
  value = e.target.value;
  if (eventSource === 'list') {
    // alert('CLICKED! ' + value);
    weatherForTheCity(value);
    // input out of focus on enter
    searchInput.blur();
  }
});

searchCity.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13) {
        weatherForTheCity(searchCity.value);
        // input out of focus on enter
        searchInput.blur();
    }
})

let date = new Date;
let updateTodayWeather = (data) => {
    // console.log((data.dt)/1000*60*60);
    // console.log(msToTime(data.dt));
    let todayweather = data.weather[0];
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
                     Math.round(data.main.temp) :
                     Math.round(data.main.temp);

    let imgId = todayweather.id;

    let description = data.weather[0].description;
    let toCapitalCaseDescription = toCapitalCase(description); 
    condition.textContent = toCapitalCaseDescription;
    
    let hour = date.getHours();
    if(hour >= 6 && hour <18) {
        weatherImagesDay.forEach(obj => {
            if(obj.ids.includes(imgId)) {
                image.src = obj.url;
            }
        })
    }else{
        weatherImagesNight.forEach(obj => {
            if(obj.ids.includes(imgId)) {
                image.src = obj.url;
            }
        })
    }
    
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
        daysWeatherId = daysWeather.id;
        let iconUrl;
        let findIconUrl = weatherImagesDay.forEach(obj => {
            if(obj.ids.includes(daysWeatherId)) {
                iconUrl = obj.url;
            }
        });
        
        let dayName = dayOfWeek(day.dt * 1000);
        let dayTemp = day.main.temp;
        let temperature = dayTemp > 0 ? 
                    '+' + Math.round(dayTemp) :
                     Math.round(dayTemp);

        let forecastItem = `
            <article class="weather-forecast-item">
                <img src=${iconUrl} draggable="false" alt=" " class="forecast-icon">
                <h4 class="forecast-day">${dayName}</h4>
                <p class="forecast-temperature"><span class="forecast-temperature-value">${temperature}</span> &deg;C</p>
            </article>
        `
        forecastBlock.insertAdjacentHTML('beforeend', forecastItem);
    })
}

let toCapitalCase =(string) => {
    let words = string.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let joinedWords = words.join(" ");
    return joinedWords;
}


let cityBaseEndPoint = 'https://api.teleport.org/api/cities/?search=';

searchCity.addEventListener('input', async () => {
    let endPoint = cityBaseEndPoint + searchCity.value;
    let result = await (await fetch(endPoint)).json();
    suggestions.innerHTML = '';
    let cities = result._embedded['city:search-results'];
    let length = cities.length > 5 ? 5 : cities.length;

    for(let i = 0; i < length; i++){
        let option = document.createElement('option');
        option.value = cities[i].matching_full_name;
        suggestions.appendChild(option);
    }
}) 

//if user is offline
let offlineContainer = document.querySelector('.offline-wrapper');
let offline = document.querySelector('.offline');
let online = document.querySelector('.online');

window.addEventListener('offline', () => {
    online.classList.add('no-display');
    offline.classList.remove('no-display');
    offlineContainer.classList.remove('no-display');
});
window.addEventListener('online', () => {
    offline.classList.add('no-display');
    online.classList.remove('no-display');
    setTimeout(function(){
        offlineContainer.classList.add('no-display');
    },2000);
});
