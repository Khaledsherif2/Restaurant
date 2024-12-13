const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { egyptArabicDate } = require("../utils/date");

const reviewSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    menuItemId: { type: mongoose.Schema.ObjectId, ref: "Menu", required: true },
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    comment: { type: String, required: true },
    createdAt: { type: String, default: egyptArabicDate },
  },
  {
    timestamps: true,
  }
);

const reviewModel = mongoose.model("Reviews", reviewSchema);

module.exports = reviewModel;
