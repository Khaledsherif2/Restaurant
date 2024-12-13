const {
  userJoiSchema,
  logJoiSchema,
  updateProfileJoiSchema,
  menuSchema,
  updateMenuSchema,
  categorySchema,
  orderSchema,
  orderStatusSchema,
  orderStatusUserSchema,
  reservationSchema,
  updateReservationSchema,
  reviewSchema,
  updateReviewSchema,
} = require("../models/joi.model");

const validation = (req, res, next) => {
  const path = req.originalUrl;
  const method = req.method;
  let schema;

  if (/\/login$/.test(path)) {
    schema = logJoiSchema;
  } else if (/\/register$/.test(path)) {
    schema = userJoiSchema;
  } else if (/\/profile$/.test(path)) {
    schema = updateProfileJoiSchema;
  } else if (/\/menu$/.test(path)) {
    schema = menuSchema;
  } else if (/\/menu\/[a-zA-Z0-9]+$/.test(path) && method === "PUT") {
    schema = updateMenuSchema;
  } else if (/\/categories$/.test(path)) {
    schema = categorySchema;
  } else if (/\/categories\/[a-zA-Z0-9]+$/.test(path) && method === "PUT") {
    schema = categorySchema;
  } else if (/\/orders$/.test(path)) {
    schema = orderSchema;
  } else if (/\/orders\/[a-zA-Z0-9]+$/.test(path) && method === "PUT") {
    if (req.user.role === "admin" && req.body.status) {
      schema = orderStatusSchema;
    } else {
      schema = orderSchema;
    }
  } else if (/\/reservations$/.test(path)) {
    schema = reservationSchema;
  } else if (/\/reservations\/[a-zA-Z0-9]+$/.test(path) && method === "PUT") {
    schema = updateReservationSchema;
  } else if (/\/reviews$/.test(path)) {
    schema = reviewSchema;
  } else if (/\/reviews\/[a-zA-Z0-9]+$/.test(path) && method === "PUT") {
    schema = updateReviewSchema;
  } else {
    return res.status(400).json({ message: "Invalid endpoint" });
  }

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.data = value;
  next();
};

module.exports = validation;
