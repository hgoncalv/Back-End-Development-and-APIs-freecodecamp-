require("dotenv").config();
let express = require("express");
let app = express();

const publicFolderPath = __dirname + "/public";

app.use("/public", express.static(publicFolderPath));

app.get("/", (req, res) => {
  const thisFolderPath = __dirname;
  const filePath = thisFolderPath + "/views/index.html";
  res.sendFile(filePath);
});

app.get("/json", (req, res) => {
  const mySecret = process.env["MESSAGE_STYLE"];
  const message =
    mySecret === "uppercase" ? "Hello json".toUpperCase() : "Hello json";
  res.send({ message });
});

module.exports = app;
