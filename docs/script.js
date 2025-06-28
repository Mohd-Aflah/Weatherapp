const BACKEND_URL = "https://your-render-backend.onrender.com"; // Replace with your backend

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

async function fetchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');

  if (!city) {
    display.innerHTML = `<div class="placeholder-card"><p>Enter a city</p></div>`;
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/weather?city=${city}`);
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    display.innerHTML = `
      <div class="weather-card">
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temp: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      </div>
    `;
  } catch (err) {
    display.innerHTML = `<div class="placeholder-card"><p>⚠️ Failed to load weather</p></div>`;
  }
}

async function fetchForecast() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');

  if (!city) {
    display.innerHTML = `<div class="placeholder-card"><p>Enter a city</p></div>`;
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/forecast?city=${city}`);
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    const grouped = {};

    data.list.forEach(entry => {
      const [date, time] = entry.dt_txt.split(" ");
      if (time === "12:00:00") grouped[date] = entry;
    });

    let html = `<div class="forecast-list">`;
    for (const date in grouped) {
      const entry = grouped[date];
      html += `
        <div class="forecast-card">
          <h4>${date}</h4>
          <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" />
          <p>${entry.weather[0].main}</p>
          <p>🌡 ${entry.main.temp} °C</p>
        </div>
      `;
    }
    html += `</div>`;

    display.innerHTML = html;
  } catch (err) {
    display.innerHTML = `<div class="placeholder-card"><p>⚠️ Failed to load forecast</p></div>`;
  }
}
