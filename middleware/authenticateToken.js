require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req, res, next) {
  const token = req.cookies.authToken || req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token required." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = authenticateToken;
