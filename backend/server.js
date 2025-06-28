import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ✅ Create the app BEFORE defining routes
const app = express();
app.use(cors());

// ✅ Get API key from .env
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ✅ Current weather endpoint
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.json({ error: "City is required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: "City not found or API error" });
  }
});

// ✅ 5-day forecast endpoint
app.get('/api/forecast', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.json({ error: "City is required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: "City not found or API error" });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
