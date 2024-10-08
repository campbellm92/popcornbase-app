require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

function verifyAuth(req, res, next) {
  const token = req.cookies.authToken || req.header("Authorization");

  if (!token) {
    req.isAuthenticated = false; // isAuthenticated is a JS custom property
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    req.isAuthenticated = true;
  } catch (error) {
    req.isAuthenticated = false;
  }
  next();
}

module.exports = verifyAuth;
