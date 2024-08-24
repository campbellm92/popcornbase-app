const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.post("/signup", async (req, res) => {});

// let sql = ‘SELECT * FROM inventory’; << useful to create variables for common sql queries
/*

I need to: 
> set up route for signup - router.post
> build a query to check if email exists or not (select .. from)
> make sure email is correct format
> if email doesn't exist, create new user (insert into)
> check password strong enough
> hash password
> connect to jwt token
*/

module.exports = router;
