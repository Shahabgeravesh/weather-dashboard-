const axios = require("axios");
require("dotenv").config();

module.exports = {
  getWeather: async (req, res) => {
    const base_url = "https://api.openweathermap.org/data/2.5/weather";
    if (!req.user) {
      res.redirect("/");
    } else {
      try {
        const response = await axios.get(
          `${base_url}?zip=${req.user.zip},us&units=imperial&appid=${process.env.WEATHER_KEY}`
        );
        res.send(response.data);
      } catch (err) {
        res.send(err);
      }
    }
  },
};
