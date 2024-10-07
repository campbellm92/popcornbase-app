require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getUserByEmail,
  verifyUserPassword,
} = require("../queries/userQueries");

// const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).render("login", {
        invalidUserError:
          "The email you've entered could not be found. Please try again.",
      });
    }
    const correctPassword = await verifyUserPassword(password);
    if (!correctPassword) {
      res.status(400).render("login", {
        incorrectPasswordError:
          "The password you've entered is incorrect. Please try again.",
      });
    }
    res.status(200).render("login", {
      successfulLogin: "Login successful. You'll now be redirected.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("login", {
      generalError: "An unexpected error occurred. Please try again.",
    });
  }
});

// const token = jwt.sign(
//   { userId: result.insertId, email: email },
//   JWT_SECRET,
//   {
//     expiresIn: "1h",
//   }
// );

module.exports = router;
