const reviewModel = require("../models/review.model");
const { egyptArabicDate } = require("../utils/date");

class ReviewRepository {
  constructor() {}

  async findAndPopulate(query) {
    return await reviewModel
      .find(query, { __v: false })
      .populate("userId", "username phone email")
      .populate("menuItemId", "name category");
  }

  async getReviews() {
    const reviews = await this.findAndPopulate({});
    return reviews;
  }

  async getMenuItemReviews(id) {
    const reviews = await this.findAndPopulate({ menuItemId: id });
    return reviews;
  }

  async addReview(id, data) {
    data.userId = id;
    data.createdAt = egyptArabicDate;
    const newReview = new reviewModel(data);
    await newReview.save();
    const review = await this.findAndPopulate(newReview._id);
    return review;
  }

  async updateReview(reviewId, userId, data) {
    const doc = await reviewModel.findById(reviewId);
    if (!doc) throw { statusCode: 404, message: "Review not found." };
    if (userId === doc.userId.toString()) {
      await reviewModel.findByIdAndUpdate(reviewId, data);
      return;
    } else
      throw {
        statusCode: 403,
        message: "You are not authorized to update this review.",
      };
  }

  async deleteReview(reviewId, user) {
    const doc = await reviewModel.findById(reviewId);
    if (!doc) throw { statusCode: 404, message: "Review not found." };
    if (user.role === "user" && doc.userId.toString() === user.id) {
      await reviewModel.findByIdAndDelete(reviewId);
      return { success: true };
    } else if (user.role === "admin") {
      await reviewModel.findByIdAndDelete(reviewId);
      return { success: true };
    } else
      throw {
        statusCode: 403,
        message: "You are not authorized to delete this review.",
      };
  }
}

module.exports = ReviewRepository;
