/**
 * Weather Dashboard - Frontend JavaScript
 * 
 * Handles all frontend interactions including API calls to the backend,
 * UI updates, and user interactions for the weather dashboard application.
 * 
 * @author Mohammed Aflah
 * @author Ayra Riyaz
 * @version 1.0.0
 * @year 2025
 * @license MIT
 * 
 * Features:
 * - Fetches current weather data from backend API
 * - Retrieves 5-day weather forecasts
 * - Dynamically updates UI with weather information
 * - Handles errors and displays user-friendly messages
 * - Manages tab switching between current weather and forecast
 * 
 * Copyright (c) 2025 Mohammed Aflah and Ayra Riyaz
 */

// Backend API URL - Replace with your actual deployment URL
const BACKEND_URL = "https://weatherapp-jh3a.onrender.com";

/**
 * Switches between Current Weather and Forecast tabs
 * 
 * @param {string} tab - The tab to display ('current' or 'forecast')
 * 
 * This function:
 * - Updates active tab styling
 * - Triggers appropriate data fetch based on selected tab
 */
function showTab(tab) {
  // Remove active class from all tab buttons
  document.getElementById('currentBtn').classList.remove('active');
  document.getElementById('forecastBtn').classList.remove('active');
  
  // Add active class to selected tab
  document.getElementById(`${tab}Btn`).classList.add('active');

  // Fetch appropriate data based on selected tab
  if (tab === 'current') {
    fetchWeather();
  } else {
    fetchForecast();
  }
}

/**
 * Fetches and displays current weather data for the entered city
 * 
 * Makes an API call to the backend to retrieve current weather conditions
 * including temperature, humidity, wind speed, and weather description.
 * Updates the UI with the received data or displays an error message.
 * 
 * @async
 * @returns {Promise<void>}
 * 
 * API Response includes:
 * - City name and country code
 * - Temperature (Celsius)
 * - Weather condition with icon
 * - Humidity percentage
 * - Wind speed (m/s)
 */
async function fetchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');

  // Validate city input
  if (!city) {
    display.innerHTML = `<div class="placeholder-card"><p>Please enter a city.</p></div>`;
    return;
  }

  // Show loading state
  display.innerHTML = `<div class="placeholder-card"><p>Loading weather...</p></div>`;

  try {
    // Make API request to backend
    const response = await fetch(`${BACKEND_URL}/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    // Check for error in response
    if (data.error) throw new Error(data.error);

    // Update UI with weather data
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
    // Display error message
    display.innerHTML = `<div class="placeholder-card"><p>⚠️ Failed to load weather. ${err.message}</p></div>`;
  }
}

/**
 * Fetches and displays 5-day weather forecast for the entered city
 * 
 * Makes an API call to retrieve forecast data and filters it to show
 * only one entry per day (at 12:00 PM). Displays forecast cards with
 * date, weather icon, condition, and temperature.
 * 
 * @async
 * @returns {Promise<void>}
 * 
 * Forecast Display:
 * - Filters data to show 12:00 PM entries only
 * - Shows date, weather icon, condition, and temperature
 * - Creates a responsive grid of forecast cards
 */
async function fetchForecast() {
  const city = document.getElementById('cityInput').value.trim();
  const display = document.getElementById('weatherDisplay');

  // Validate city input
  if (!city) {
    display.innerHTML = `<div class="placeholder-card"><p>Please enter a city.</p></div>`;
    return;
  }

  // Show loading state
  display.innerHTML = `<div class="placeholder-card"><p>Loading forecast...</p></div>`;

  try {
    // Make API request to backend
    const response = await fetch(`${BACKEND_URL}/api/forecast?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    // Check for error in response
    if (data.error) throw new Error(data.error);

    // Filter forecast entries to only include 12:00 PM each day
    // This provides one representative forecast per day
    const forecastEntries = {};
    data.list.forEach(entry => {
      const [date, time] = entry.dt_txt.split(" ");
      if (time === "12:00:00") {
        forecastEntries[date] = entry;
      }
    });

    // Generate forecast cards HTML
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

    // Update UI with forecast data
    display.innerHTML = forecastHTML;
  } catch (err) {
    // Display error message
    display.innerHTML = `<div class="placeholder-card"><p>⚠️ Failed to load forecast. ${err.message}</p></div>`;
  }
}
