require("dotenv").config();
const axios = require("axios");

const TMDB_KEY = process.env.TMDB_KEY;

async function fetchMovies(minRating, maxRating) {
  const page = Math.floor(Math.random() * 500) + 1;
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&page=${page}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`
    );
    const data = res.data;
    const movies = data.results;

    if (movies.length === 0) {
      console.log("No movies found");
    }
    console.log(movies);

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    return randomMovie;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { fetchMovies };
