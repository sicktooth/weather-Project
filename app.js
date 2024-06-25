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
            weatherDescription = weatherData.weather[0].description;

      log(weatherData);
      log(weatherTemp);
      log(weatherDescription);
    });
    
  });

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`weather app server has started at http://localhost:${port}`);
});