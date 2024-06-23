import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`weather app server has started at http://localhost:${port}`);
});