const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { egyptArabicDate } = require("../utils/date");

const reservationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    createdAt: {
      type: String,
      default: egyptArabicDate,
    },
  },
  {
    timestamps: true,
  }
);

const reservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = reservationModel;
