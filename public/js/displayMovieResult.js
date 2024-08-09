document.addEventListener("DOMContentLoaded", function () {
  const slidingForm = document.getElementById("slidingForm");
  const resultsContainer = document.getElementById("resultsContainer");

  slidingForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const minRating = document.getElementById("minRating").value;
    const maxRating = document.getElementById("maxRating").value;

    try {
      const response = await fetch(
        `/?minRating=${minRating}&maxRating=${maxRating}`,
        {
          method: "GET",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      let html = "";
      if (data.movie) {
        html = `<h3 class="text-center rec-title mt-4">Your movie recommendation:</h3>
              <div class="card mx-auto mt-4 mb-5 d-flex flex-row" style="max-width: 540px;">
                  <img src="https://image.tmdb.org/t/p/w200${data.movie.poster_path}" alt="Movie poster" class="img-fluid rounded-start">
                  <div class="card-body">
                  <h5 class="card-title">${data.movie.title}</h5>
                  <p class="card-text">${data.movie.overview}</p>
                  <p class="card-text"><small class="text-muted">Rating: ${data.movie.vote_average}</small></p>
                  </div>
              </div>`;
      }

      resultsContainer.innerHTML = html;
      resultsContainer.classList.add("slide-up");
      resultsContainer.style.display = "block"; // Ensure the container is visible
    } catch (error) {
      console.error(error);
    }
  });
});
