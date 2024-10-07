require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const indexRouter = require("./routes/index.js");
const signupRouter = require("./routes/signup.js");
const loginRouter = require("./routes/login.js");

const app = express();

// Set up views paths
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure that express can read static files
app.use(express.static(path.join(__dirname, "public")));

// Use the routers
app.use("/", indexRouter);
app.use("/", signupRouter);
app.use("/", loginRouter);

module.exports = app;
