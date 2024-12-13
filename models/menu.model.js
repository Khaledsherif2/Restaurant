const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: { type: String, min: 3, required: true },
  description: { type: String, min: 5, required: true },
  price: { type: Array, required: true },
  category: { type: String, min: 3, required: true },
});

const menuModel = mongoose.model("Menu", menuSchema);

module.exports = menuModel;
