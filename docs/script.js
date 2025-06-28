const BACKEND_URL = " https://weatherapp-jh3a.onrender.com"; // Replace with your actual Render backend URL

async function fetchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');
  display.innerHTML = "🔄 Loading...";

  try {
    const res = await fetch(`${BACKEND_URL}/api/weather?city=${city}`);
    const data = await res.json();

    if (data.error) {
      display.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
      return;
    }

    display.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <p>${data.weather[0].description}</p>
    `;
  } catch (err) {
    display.innerHTML = `<p style="color:red;">⚠️ Failed to fetch data</p>`;
  }
}
