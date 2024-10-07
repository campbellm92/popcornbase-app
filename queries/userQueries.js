const pool = require("../config/db");
const { hashPassword, verifyPassword } = require("../utils/passwordUtils");

async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

async function getUser(id) {
  const [row] = await pool.query(`SELECT * FROM users WHERE id =?`, [id]);
  return row;
}

// signup endpoint
async function createUser(email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      `INSERT INTO users (email, password)
        VALUES (?, ?)`,
      [email, hashedPassword]
    );
    return result;
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
}

// admin
async function updateUser(id, email, password) {
  const result = await pool.query(
    `UPDATE users SET email = ?, password = ? WHERE id = ?`,
    [email, password, id]
  );
  return result;
}

// admin & user (dashboard)
async function deleteUser(id) {
  const result = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
  return result;
}

// sanitisation (signup endpoint)
async function userExists(email) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as count FROM users WHERE email = ?`,
    [email]
  );
  return rows[0].count > 0;
}

// user (dashboard)
async function updateUserPassword(id, newPassword) {
  const result = await pool.query(
    `UPDATE users SET password = ? WHERE id = ?`,
    [newPassword, id]
  );
  return result;
}

// login endpoint (checking user exists)
async function getUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

// possibly redundant:
// use this or passwordUtils? - BOTH
// async function verifyUserPassword(email, password) {
//   const [row] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
//     email,
//   ]);
//   const user = row[0];

//   if (!user) {
//     return false;
//   }

//   const passwordMatches = await verifyPassword(user.password, password);
//   return passwordMatches;
// }

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userExists,
  updateUserPassword,
  // verifyUserPassword,
  getUserByEmail,
};
