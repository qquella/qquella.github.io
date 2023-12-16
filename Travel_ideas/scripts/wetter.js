'use strict'
const apiKey = '1176391aa9725d9610e313d4a42a4f23';
const city = 'Zurich';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        updateCurrentWeather(data.list[0]);
        updateTemperature('today-temperature', data.list[0].main.temp);
        updateWeatherDescription('today-weather', data.list[0].weather[0].description);

        updateTemperature('monday-temperature', data.list[1].main.temp);
        updateWeatherDescription('monday-weather', data.list[1].weather[0].description);

        updateTemperature('tuesday-temperature', data.list[2].main.temp);
        updateWeatherDescription('tuesday-weather', data.list[2].weather[0].description);

        updateTemperature('wednesday-temperature', data.list[3].main.temp);
        updateWeatherDescription('wednesday-weather', data.list[3].weather[0].description);

        updateTemperature('thursday-temperature', data.list[4].main.temp);
        updateWeatherDescription('thursday-weather', data.list[4].weather[0].description);

        updatePrecipitationTimeline(data.list.slice(0, 6)); // Assuming data is available for the next 6 hours
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateCurrentWeather(currentWeather) {
    const currentWeatherElement = document.getElementById('current-weather');
    const { main, weather, wind, visibility, humidity, dew_point } = currentWeather;

    currentWeatherElement.innerHTML = `
        ${city}, CH<br>
        ${convertKelvinToCelsius(main.temp)}°C (Feels like ${convertKelvinToCelsius(main.feels_like)}°C). ${weather[0].description}. ${wind ? wind.speed + 'm/s ' : 'Wind data not available'}<br>
        ${visibility ? 'Visibility: ' + visibility + 'km' : 'Visibility data not available'}<br>
        ${'Pressure: ' + main.pressure}hPa<br>
    `;
}

function updateTemperature(elementId, temperature) {
    const temperatureElement = document.getElementById(elementId);
    temperatureElement.textContent = `${convertKelvinToCelsius(temperature)}°C`;
}

function updateWeatherDescription(elementId, description) {
    const weatherElement = document.getElementById(elementId);
    weatherElement.textContent = description;
}

function updatePrecipitationTimeline(forecastData) {
    const precipitationTimelineElement = document.getElementById('precipitation-timeline');
    precipitationTimelineElement.innerHTML = 'No precipitation within an hour<br>';

    const timeline = [
        'now', '15min', '30min', '45min', '60min', '75min'
    ];

    forecastData.forEach((forecast, index) => {
        precipitationTimelineElement.innerHTML += `${timeline[index]}: ${forecast.rain ? forecast.rain['1h'] : '0'}mm/h<br>`;
    });
}

function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1);
}

// Fetch weather data on page load
fetchWeather();

// Refresh weather data every 30 minutes (adjust as needed)
setInterval(fetchWeather, 30 * 60 * 1000);