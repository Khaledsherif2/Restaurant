const express = require("express");
const router = express.Router();
const authintication = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const reviewsRouter = (reviewsRepository) => {
  router.get("/", authintication, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        const reviews = await reviewsRepository.getReviews();
        return res.status(200).json({ message: "Reviews.", data: reviews });
      } else throw { statusCode: 403, message: "You dont have permission." };
    } catch (e) {
      next(e);
    }
  });

  router.get("/:menuItemId", authintication, async (req, res, next) => {
    try {
      const reviews = await reviewsRepository.getMenuItemReviews(
        req.params.menuItemId
      );
      return res.status(200).json({ message: "Reviews.", data: reviews });
    } catch (e) {
      next(e);
    }
  });

  router.post("/", authintication, validation, async (req, res, next) => {
    try {
      const review = await reviewsRepository.addReview(req.user.id, req.data);
      return res
        .status(201)
        .json({ message: "Review added successfully.", data: review });
    } catch (e) {
      next(e);
    }
  });

  router.put("/:id", authintication, validation, async (req, res, next) => {
    try {
      await reviewsRepository.updateReview(
        req.params.id,
        req.user.id,
        req.data
      );
      return res.status(202).json({ message: "Review updated successfully." });
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", authintication, async (req, res, next) => {
    try {
      const result = await reviewsRepository.deleteReview(
        req.params.id,
        req.user
      );
      if (result.success) {
        return res
          .status(200)
          .json({ message: "Review deleted successfully." });
      }
    } catch (e) {
      next(e);
    }
  });

  return router;
};

module.exports = reviewsRouter;
