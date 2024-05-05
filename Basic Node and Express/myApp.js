let express = require("express");
let app = express();

console.log("Hello World");

app.get("/", (req, res) => {
  thisFolderPath = __dirname;
  filePath = thisFolderPath + "/views/index.html";
  res.sendFile(filePath);
});

module.exports = app;
