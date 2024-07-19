require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const indexRouter = require("./routes/index.js");

const app = express();

// Set up views paths
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Ensure that express can read static files
app.use(express.static(path.join(__dirname, "public")));

// Use the routers
app.use("/", indexRouter);

module.exports = app;
