async function fetchForecast() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');
  display.innerHTML = "🔄 Loading 5-day forecast...";

  try {
    const res = await fetch(`${BACKEND_URL}/api/forecast?city=${city}`);
    const data = await res.json();

    if (data.error) {
      display.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
      return;
    }

    // Group by date, and take one reading per day (e.g., 12:00)
    const dailyData = {};
    data.list.forEach(entry => {
      const date = entry.dt_txt.split(" ")[0];
      const time = entry.dt_txt.split(" ")[1];
      if (time === "12:00:00") dailyData[date] = entry;
    });

    let html = `<h2>📅 5-Day Forecast for ${data.city.name}, ${data.city.country}</h2>`;
    for (const [date, entry] of Object.entries(dailyData)) {
      html += `
        <div style="margin-bottom: 1rem; border: 1px solid #ccc; padding: 1rem; border-radius: 8px;">
          <strong>${date}</strong><br/>
          <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" /><br/>
          ${entry.weather[0].description}<br/>
          🌡 Temp: ${entry.main.temp} °C<br/>
          💧 Humidity: ${entry.main.humidity}%<br/>
          💨 Wind: ${entry.wind.speed} m/s
        </div>
      `;
    }

    display.innerHTML = html;

  } catch (err) {
    display.innerHTML = `<p style="color:red;">⚠️ Failed to load forecast</p>`;
  }
}
