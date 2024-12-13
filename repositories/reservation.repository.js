const reservationModel = require("../models/reservation.model");
const { egyptArabicDate } = require("../utils/date");

class ReservationRepository {
  constructor() {}

  async findAndPopulate(query) {
    return await reservationModel
      .find(query, { __v: false })
      .populate("userId", "username email phone");
  }

  async getReservations() {
    const reservations = await this.findAndPopulate({});
    return reservations;
  }

  async getUserReservations(id) {
    const reservations = await this.findAndPopulate({ userId: id });
    return reservations;
  }

  async makeReservation(id, data) {
    data.userId = id;
    data.createdAt = egyptArabicDate;
    const newReservation = new reservationModel(data);
    await newReservation.save();
    const reservation = await this.findAndPopulate(newReservation._id);
    return reservation;
  }

  async updateReservation(id, data) {
    const reservation = await reservationModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!reservation)
      throw { statusCode: 404, message: "Reservation not found." };
    return reservation;
  }

  async deleteReservation(id) {
    const reservation = await reservationModel.findByIdAndDelete(id);
    if (!reservation)
      throw { statusCode: 404, message: "Reservation not found." };
    return;
  }
}

module.exports = ReservationRepository;
