require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createUser, userExists } = require("../queries/userQueries");
const { hashPassword } = require("../utils/passwordUtils");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    const emailIsValid = validEmailRegex.test(email);
    const passwordIsStrong = strongPasswordRegex.test(password);

    if (!email || !password) {
      return res.status(400).render("signup", {
        requiredError:
          "A valid email address and password are required to proceed.",
      });
    } else if (!emailIsValid) {
      return res.status(400).render("signup", {
        invalidEmailError: "Please enter a valid email address.",
      });
    } else if (!passwordIsStrong) {
      return res.status(400).render("signup", {
        invalidPasswordError:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    }

    const emailAlreadyInDB = await userExists(email);
    if (emailAlreadyInDB) {
      return res.status(400).render("signup", {
        emailExistsError:
          "This email address has already been used to create an account.",
      });
    }

    await createUser(email, password);

    res
      .status(200)
      .render("signup", { successfulSignup: "You've successfully signed up!" });

    // setTimeout(() => {
    //   res.redirect("/");
    // }, 3000);
  } catch (error) {
    console.error(error);
    res.status(500).render("signup", {
      generalError: "An unexpected error occurred. Please try again.",
    });
  }
});

module.exports = router;
