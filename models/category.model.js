const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, min: 3, required: true },
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
