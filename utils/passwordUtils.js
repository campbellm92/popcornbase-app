const argon2 = require("argon2");

async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    console.log(error);
  }
}

async function verifyPassword(hash, password) {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { hashPassword, verifyPassword };

//salting done automatically with argon2
