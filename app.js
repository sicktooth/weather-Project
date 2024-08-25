const express = require("express");
const https = require("https");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let weatherDataStore = {}; // Object to store weather data for different cities

app.get("/", (req, res) => {
  // Render the homepage without any weather data by default
  res.render("list", { 
    city: null,
    temp: null,
    description: null,
    weatherIcon: null
  });
});

app.post("/", (req, res) => {
  const city = req.body.cityName;
  const query = city,
        unit = "metric",
        apiKey = "340e6b918ec7d7dd6fb1b86e6c23bb5c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const weatherTemp = weatherData.main.temp,
            weatherDescription = weatherData.weather[0].description,
            weatherIcon = weatherData.weather[0].icon,
            iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      // Store the weather data in an object with the city name as the key
      weatherDataStore[city] = {
        iconUrl,
        weatherTemp,
        weatherDescription,
        city
      };

      // Redirect to the home page with the weather data for the requested city
      res.render("list", {
        city: weatherDataStore[city].city,
        temp: weatherDataStore[city].weatherTemp,
        description: weatherDataStore[city].weatherDescription,
        weatherIcon: weatherDataStore[city].iconUrl
      });
      // console.log(weatherDataStore);
    });
  });
});

app.listen(port, () => {
  console.log(`Weather app server has started at http://localhost:${port}`);
});
