async function fetchForecast() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');
  const chartCanvas = document.getElementById('forecastChart');
  display.innerHTML = "🔄 Loading 5-day forecast...";
  const BACKEND_URL = "https://weatherapp-jh3a.onrender.com";



 
  try {
    const res = await fetch(`${BACKEND_URL}/api/forecast?city=${city}`);
    const data = await res.json();

    if (data.error) {
      display.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
      return;
    }

    const labels = [];
    const temps = [];

    // Pick forecast at 12:00:00 each day
    data.list.forEach(entry => {
      const [date, time] = entry.dt_txt.split(" ");
      if (time === "12:00:00") {
        labels.push(date);
        temps.push(entry.main.temp);
      }
    });

    display.innerHTML = `<h2>📊 5-Day Temperature Forecast for ${data.city.name}, ${data.city.country}</h2>`;

    // Destroy old chart instance if it exists
    if (window.forecastChart) window.forecastChart.destroy();

    window.forecastChart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temps,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });

  } catch (err) {
    console.error(err);
    display.innerHTML = `<p style="color:red;">⚠️ Failed to load forecast</p>`;
  }
}
