const bcryptJs = require("bcryptjs");

const hashedPassword = async (userPassword) => {
  return await bcryptJs.hash(userPassword, 10);
};

module.exports = hashedPassword;
