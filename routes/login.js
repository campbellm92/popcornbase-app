require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../queries/userQueries");
const { verifyPassword } = require("../utils/passwordUtils");

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        requiredError:
          "A valid email address and password are required to proceed.",
      });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).render("login", {
        invalidUserError:
          "The email you've entered could not be found. Please try again.",
      });
    }

    const correctPassword = await verifyPassword(user.password, password);
    if (!correctPassword) {
      return res.status(400).render("login", {
        incorrectPasswordError:
          "The password you've entered is incorrect. Please try again.",
      });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true, //possibly change bc might not set with http during production
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).render("login", {
      successfulLogin: "Login successful. You'll now be redirected.",
    }); //will need to add a redirect
  } catch (error) {
    console.error(error);
    res.status(500).render("login", {
      generalError: "An unexpected error occurred. Please try again.",
    });
  }
});

module.exports = router;
