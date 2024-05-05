require("dotenv").config();
bodyParser = require("body-parser");

let express = require("express");
let app = express();

const publicFolderPath = __dirname + "/public";

//middleware
app.use("/public", express.static(publicFolderPath));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  const reqInfo = { method: req.method, path: req.path, ip: req.ip };
  console.log(`${reqInfo.method} ${reqInfo.path} - ${reqInfo.ip}`);
  next();
});

//routers
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

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.send({ echo: req.params.word });
});

app
  .route("/name")
  .get((req, res) => {
    res.send({ name: `${req.query.first} ${req.query.last}` });
  })
  .post((req, res) => {
    res.send({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
