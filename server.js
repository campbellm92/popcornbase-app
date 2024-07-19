const app = require("./app");

const port = 3000; // configure later w/other port info

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
