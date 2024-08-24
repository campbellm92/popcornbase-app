require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  })
  .promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    process.exit(1); // Exit the process with a failure code
  }
  if (connection) connection.release(); // Release the connection back to the pool
  console.log("Connected to the MySQL database");
});

/* 
Testing needs to be conducted from root b/c by default the package looks for .env in the current working directory
ergo, testing would entail PROJECT ROOT > node config/db.js

*/

async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

async function getUser(id) {
  const [row] = await pool.query(`SELECT * FROM users WHERE id =?`, [id]);
  return row;
}

async function createUser(email, password) {
  const result = await pool.query(
    `INSERT INTO users (email, password)
    VALUES (?, ?)`,
    [email, password]
  );
  return result;
}

(async () => {
  try {
    const info = await createUser("example3@email.com", "G00G0036$"); // Await the result of the asynchronous function
    console.log(info);
  } catch (err) {
    console.error("Error fetching user info:", err);
  }
})();

module.exports = pool;
