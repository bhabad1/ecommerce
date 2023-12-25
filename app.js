require("rootpath")();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var errorHandler = require("./middleware/error_handler");

var indexRouter = require("./routes/index");
const rateLimiter = require("./middleware/rate_limiter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(rateLimiter);
app.use("/api", indexRouter);
app.use(errorHandler);

module.exports = app;
