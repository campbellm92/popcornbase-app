const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

router.post("login", (req, res) => {
  const { email, password } = req.body;
});

// const token = jwt.sign(
//   { userId: result.insertId, email: email },
//   JWT_SECRET,
//   {
//     expiresIn: "1h",
//   }
// );
