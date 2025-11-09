/**
 * Weather Dashboard Backend Server
 * 
 * A REST API server that provides weather data and forecasts using OpenWeatherMap API.
 * This server handles requests for current weather conditions and 5-day forecasts
 * for any city worldwide.
 * 
 * @author Mohammed Aflah
 * @author Ayra Riyaz
 * @version 1.0.0
 * @year 2025
 * @license MIT
 * 
 * Features:
 * - Current weather data retrieval
 * - 5-day weather forecast
 * - CORS enabled for cross-origin requests
 * - Environment-based configuration
 * - Error handling for invalid requests
 * 
 * API Endpoints:
 * - GET /api/weather?city={cityName} - Returns current weather data
 * - GET /api/forecast?city={cityName} - Returns 5-day forecast data
 * 
 * Copyright (c) 2025 Mohammed Aflah and Ayra Riyaz
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Initialize Express application
const app = express();

// Enable CORS for all routes to allow frontend access
app.use(cors());

// Load API key from environment variables
const API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * GET /api/weather
 * 
 * Fetches current weather data for a specified city.
 * 
 * @param {string} city - City name (query parameter)
 * @returns {Object} Weather data including temperature, humidity, wind speed, etc.
 * @throws {400} If city parameter is missing or weather fetch fails
 * 
 * Example: GET /api/weather?city=London
 */
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  
  // Validate city parameter
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    // Make request to OpenWeatherMap API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params: { q: city, appid: API_KEY, units: 'metric' } }
    );
    
    // Return weather data
    res.json(response.data);
  } catch (error) {
    // Handle errors (invalid city, network issues, etc.)
    res.status(400).json({ error: "Weather fetch failed" });
  }
});

/**
 * GET /api/forecast
 * 
 * Fetches 5-day weather forecast for a specified city.
 * Data includes weather predictions at 3-hour intervals.
 * 
 * @param {string} city - City name (query parameter)
 * @returns {Object} Forecast data with multiple time entries
 * @throws {400} If city parameter is missing or forecast fetch fails
 * 
 * Example: GET /api/forecast?city=London
 */
app.get('/api/forecast', async (req, res) => {
  const city = req.query.city;
  
  // Validate city parameter
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    // Make request to OpenWeatherMap API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      { params: { q: city, appid: API_KEY, units: 'metric' } }
    );
    
    // Return forecast data
    res.json(response.data);
  } catch (error) {
    // Handle errors (invalid city, network issues, etc.)
    res.status(400).json({ error: "Forecast fetch failed" });
  }
});

// Set port from environment or use default 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Weather Dashboard Server`);
  console.log(`   Version: 1.0.0`);
  console.log(`   Running on port ${PORT}`);
  console.log(`   Authors: Mohammed Aflah & Ayra Riyaz`);
  console.log(`   Year: 2025`);
});
