var express = require("express");
var router = new express.Router();
var cors = require("cors");
var routes=require("./routes");
var app = express();

app.use(cors());

app.use("/", routes);

app.listen(3002)
console.log("listening");

module.exports = app;
