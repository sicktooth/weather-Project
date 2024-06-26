import express from "express";
import { log } from "node:console";
// import path from "path";
import https from "node:https";

const app = express();
const port = 3000;

app.get("/", (req, res) => {

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Port Harcourt&units=metric&appid=340e6b918ec7d7dd6fb1b86e6c23bb5c";

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data)
      const weatherTemp = weatherData.main.temp,
            weatherDescription = weatherData.weather[0].description,
            weatherIcon = weatherData.weather[0].icon,
            iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      res.write(`<h1>The temperature in Port Harcourt is ${weatherTemp} degrees Celsius</h1>`);
      res.write(`<img src="${iconUrl}">`);
      res.send();
    });
    
  });
});

app.listen(port, () => {
  console.log(`weather app server has started at http://localhost:${port}`);
});