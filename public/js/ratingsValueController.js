document.addEventListener("DOMContentLoaded", function () {
  const minRatingInput = document.getElementById("minRating");
  const maxRatingInput = document.getElementById("maxRating");

  minRatingInput.addEventListener("change", function () {
    const minRating = parseFloat(minRatingInput.value);
    const incrementValue = minRating + 0.1;

    maxRatingInput.min = incrementValue;

    if (parseFloat(maxRatingInput.value) <= minRating) {
      maxRatingInput.value = incrementValue;
    }
  });
});
