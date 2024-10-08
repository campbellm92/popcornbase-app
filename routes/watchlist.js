const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");

router.get("/", verifyAuth, (req, res) => {
  if (req.isAuthenticated) {
    res.render("watchlist", { isAuthenticated: req.isAuthenticated });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
