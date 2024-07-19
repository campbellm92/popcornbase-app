require("dotenv").config();
const axios = require("axios");

const TMDB_KEY = process.env.TMDB_KEY;

const options = {
  method: "GET",
  url: `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&page=1&sort_by=popularity.desc&api_key=${TMDB_KEY}`,
  headers: {
    accept: "application/json",
  },
};

async function fetchMovies() {
  try {
    const res = await axios.request(options);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

fetchMovies();

module.exports = { fetchMovies };
