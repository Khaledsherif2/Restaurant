const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const reservationRouter = (reservationRepository) => {
  router.get("/", authentication, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        const reservations = await reservationRepository.getReservations();
        return res
          .status(200)
          .json({ message: "Reservations.", data: reservations });
      }
    } catch (e) {
      next(e);
    }
  });

  router.get("/user", authentication, async (req, res, next) => {
    try {
      const reservations = await reservationRepository.getUserReservations(
        req.user.id
      );
      return res
        .status(200)
        .json({ message: "Reservations.", data: reservations });
    } catch (e) {
      next(e);
    }
  });

  router.post("/", authentication, validation, async (req, res, next) => {
    try {
      const reservation = await reservationRepository.makeReservation(
        req.user.id,
        req.data
      );
      return res.status(201).json({
        message: "Reservation created successfully.",
        data: reservation,
      });
    } catch (e) {
      next(e);
    }
  });

  router.put("/:id", authentication, validation, async (req, res, next) => {
    try {
      const reservation = await reservationRepository.updateReservation(
        req.params.id,
        req.data
      );
      return res.status(202).json({
        message: "Reservation updated successfully.",
        data: reservation,
      });
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", authentication, async (req, res, next) => {
    try {
      await reservationRepository.deleteReservation(req.params.id);
      return res
        .status(200)
        .json({ message: "Reservation cancelled successfully." });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

module.exports = reservationRouter;
