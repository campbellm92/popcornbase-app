const pool = require("../config/db");

async function getAllUsers() {
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

async function updateUser(id, email, password) {
  const result = await pool.query(
    `UPDATE users SET email = ?, password = ? WHERE id = ?`,
    [email, password, id]
  );
  return result;
}

async function deleteUser(id) {
  const result = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
  return result;
}

async function userExists(email) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as count FROM users WHERE email = ?`,
    [email]
  );
  return rows[0].count > 0;
}

async function updateUserPassword(id, newPassword) {
  const result = await pool.query(
    `UPDATE users SET password = ? WHERE id = ?`,
    [newPassword, id]
  );
  return result;
}

async function verifyUserPassword(email, password) {
  const [row] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  if (row && row.password === password) {
    return true; // In a real-world application, you would use hashing and comparison
  }
  return false;
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userExists,
  updateUserPassword,
  verifyUserPassword,
};
