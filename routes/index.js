const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("index", {
    message: "Hello there",
  });
});

module.exports = router;
