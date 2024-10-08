const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
