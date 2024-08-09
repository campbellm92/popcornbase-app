document.addEventListener("DOMContentLoaded", function () {
  const slidingForm = document.getElementById("slidingForm");
  const formContainer = document.getElementById("formContainer");
  const resultsContainer = document.getElementById("resultsContainer");

  slidingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formContainer.classList.add("slide-left");

    resultsContainer.classList.add("slide-right");
    setTimeout(() => {
      resultsContainer.style.transform = "translateX(0)";
    }, 0);

    // setTimeout(() => {
    //   resultsContainer.innerHTML =
    //     "<h2>Content Loaded!</h2><p>This is the content that appears after the form is submitted.</p>";
    // }, 500);
  });
});
