const apiKey = '9ca0795937bbf1b64383877189bc7e5b'; // Replace with your OpenWeatherMap API key

// Fetch weather by city name
function fetchWeatherByCity() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    } else {
        alert('Please enter a city name');
    }
}

// Fetch weather by user's location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        }, (error) => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}

// Fetch weather data from OpenWeatherMap API
function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            alert('Error fetching weather data');
            console.error(error);
        });
}

// Display weather data on the page
function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
}
