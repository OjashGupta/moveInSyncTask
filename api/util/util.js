const bcrypt = require("bcrypt");
const fs = require("fs");

exports.encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};

exports.decryptPassword = async (plainText, hashed) => {
  try {
    return await bcrypt.compare(plainText, hashed);
  } catch (error) {
    console.log(error);
  }
};
