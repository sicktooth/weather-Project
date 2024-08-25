const express = require("express");
// import { log } from "node:console";
// import path from "path";
const https = require("https");
// import https from "node:https";

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

var weather = [];

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "public", "index.html"));

  res.render("list", { 
    city: weather[3],
    temp: weather[1],
    description: weather[2],
    weatherIcon: weather[0]
   });
});

app.post("/", (req, res) => {
  var city = req.body.cityName;
  const query = city,
        unit = "metric",
        apiKey = "340e6b918ec7d7dd6fb1b86e6c23bb5c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data)
      const weatherTemp = weatherData.main.temp,
            weatherDescription = weatherData.weather[0].description,
            weatherIcon = weatherData.weather[0].icon,
            iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      // res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      // res.write(`<h1>The temperature in ${query} is ${weatherTemp} degrees Celsius</h1>`);
      // res.write(`<img src="${iconUrl}">`);
      // res.send();
      
      weather.push(iconUrl, weatherTemp, weatherDescription, query);
      
      console.log(weather);
      res.redirect("/");
    });
    
  });
});

app.listen(port, () => {
  console.log(`weather app server has started at http://localhost:${port}`);
});