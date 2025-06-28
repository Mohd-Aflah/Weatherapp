const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params: { q: city, appid: API_KEY, units: 'metric' } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Weather fetch failed" });
  }
});

app.get('/api/forecast', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      { params: { q: city, appid: API_KEY, units: 'metric' } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Forecast fetch failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
