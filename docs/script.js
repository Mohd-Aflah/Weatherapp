// 🔗 Replace this with your actual backend URL
const BACKEND_URL = "https://weatherapp-jh3a.onrender.com";

// 🔁 Handle switching between tabs
function showTab(tab) {
  document.getElementById('currentBtn').classList.remove('active');
  document.getElementById('forecastBtn').classList.remove('active');
  document.getElementById(`${tab}Btn`).classList.add('active');

  if (tab === 'current') {
    fetchWeather();
  } else {
    fetchForecast();
  }
}

// 🌤 Fetch current weather data
async function fetchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');

  if (!city) {
    display.innerHTML = `<div class="placeholder-card"><p>Please enter a city.</p></div>`;
    return;
  }

  display.innerHTML = `<div class="placeholder-card"><p>Loading weather...</p></div>`;

  try {
    const response = await fetch(`${BACKEND_URL}/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    display.innerHTML = `
      <div class="weather-card">
        <h2>${data.name}, ${data.sys.country}</h2>
         <h3>🌡 Temperature: ${data.main.temp} °C</h3>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" />
        <p>${data.weather[0].description}</p>
       
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      </div>
    `;
  } catch (err) {
    display.innerHTML = `<div class="placeholder-card"><p>⚠️ Failed to load weather. ${err.message}</p></div>`;
  }
}

// 📅 Fetch 5-day forecast data
async function fetchForecast() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');

  if (!city) {
    display.innerHTML = `<div class="placeholder-card"><p>Please enter a city.</p></div>`;
    return;
  }

  display.innerHTML = `<div class="placeholder-card"><p>Loading forecast...</p></div>`;

  try {
    const response = await fetch(`${BACKEND_URL}/api/forecast?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    // Filter forecast entries to only include 12:00 PM each day
    const forecastEntries = {};
    data.list.forEach(entry => {
      const [date, time] = entry.dt_txt.split(" ");
      if (time === "12:00:00") {
        forecastEntries[date] = entry;
      }
    });

    // Generate forecast cards
    let forecastHTML = `<div class="forecast-list">`;
    for (const date in forecastEntries) {
      const entry = forecastEntries[date];
      forecastHTML += `
        <div class="forecast-card">
          <h4>${date}</h4>
          <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" alt="icon" />
          <p>${entry.weather[0].main}</p>
          <p>🌡 ${entry.main.temp} °C</p>
        </div>
      `;
    }
    forecastHTML += `</div>`;

    display.innerHTML = forecastHTML;
  } catch (err) {
    display.innerHTML = `<div class="placeholder-card"><p>⚠️ Failed to load forecast. ${err.message}</p></div>`;
  }
}
