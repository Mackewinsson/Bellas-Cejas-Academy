const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const indexRouter = require("./routes/index");
const connectToMongoDb = require("./db/mongoConnection");
const { Mongoose } = require("mongoose");
const { db } = require("./db/models/userSchema");
const MongoStore = require("connect-mongo")(session);

const app = express();
//Mongo connection
connectToMongoDb();

// use sessions for tracking logins
app.use(
  session({
    secret: "client500 rocks",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

// Make user id available in templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
    title: "Error",
  });
});

module.exports = app;
