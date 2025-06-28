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
