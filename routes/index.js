const express = require("express");
const router = express.Router();
const fetchMovies = require("../handlers/fetchMovies");

router.get("/", async (req, res) => {
  const minRating = req.query.minRating;
  const maxRating = req.query.maxRating;

  if (minRating && maxRating) {
    try {
      const movie = await fetchMovies(minRating, maxRating);
      res.status(200).render("index", { movie });
    } catch (err) {
      console.error(err);
      res.status(500).render("index", { error: "Could not fetch movie." });
    }
  } else {
    res.status(200).render("index", { movie: null });
  }
});

module.exports = router;
