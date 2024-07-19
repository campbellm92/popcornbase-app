require("dotenv").config();
const axios = require("axios");

const TMDB_KEY = process.env.TMDB_KEY;

// const options = {
//   method: "GET",
//   url: ,
//   headers: {
//     accept: "application/json",
//   },
// };

async function fetchMovies(minRating, maxRating) {
  const page = Math.floor(Math.random() * 500) + 1;
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&page=${page}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`
    );
    const data = res.data;
    console.log(data);
    const movies = data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    return randomMovie;
  } catch (err) {
    console.error(err);
  }
}

console.log(fetchMovies(2, 3));

module.exports = { fetchMovies };
