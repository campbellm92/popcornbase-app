require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const cookieParser = require("cookie-parser");
const verifyAuth = require("./middleware/verifyAuth.js");
const indexRouter = require("./routes/index.js");
const signupRouter = require("./routes/signup.js");
const loginRouter = require("./routes/login.js");
const watchlistRouter = require("./routes/watchlist.js");
const logoutRouter = require("./routes/logout.js");

const app = express();

// Set up views paths
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifyAuth);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  next();
});

// Ensure that express can read static files
app.use(express.static(path.join(__dirname, "public")));

// Use the routers
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/watchlist", watchlistRouter);
app.use("/logout", logoutRouter);

module.exports = app;
