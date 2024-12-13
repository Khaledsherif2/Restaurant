const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptJs = require("bcryptjs");

const userSchema = new Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.methods.comparePasswords = async function (password) {
  return await bcryptJs.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
