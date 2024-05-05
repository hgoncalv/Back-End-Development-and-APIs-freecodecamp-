let express = require("express");
let app = express();

const publicFolderPath = __dirname + "/public";

app.use("/public", express.static(publicFolderPath));

app.get("/", (req, res) => {
  const thisFolderPath = __dirname;
  const filePath = thisFolderPath + "/views/index.html";
  res.sendFile(filePath);
});

module.exports = app;
