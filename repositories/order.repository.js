const orderModel = require("../models/order.model");

class OrderRepository {
  constructor() {}

  async findAndPopulate(query) {
    return await orderModel
      .find(query, { __v: false })
      .populate("userId", "username email phone")
      .populate("items.menuItemId", "name price");
  }

  async getOrders() {
    return this.findAndPopulate({});
  }

  async getUserOrders(userId) {
    return this.findAndPopulate({
      userId,
      status: { $nin: ["Cancelled"] },
    });
  }

  async placeOrder(data) {
    const newOrder = new orderModel(data);
    await newOrder.save();
    return this.findAndPopulate({ _id: newOrder._id });
  }

  async updateOrder(id, data) {
    let message;
    const doc = await orderModel.findById(id);
    if (!doc) throw { statusCode: 404, message: "Order not found." };
    if (doc.status === "Preparing" || doc.status === "Completed") {
      doc.status === "Preparing"
        ? (message = `Can not update the order while ${doc.status}.`)
        : (message = `Can not update the order after the order is ${doc.status}`);
      throw { statusCode: 400, message };
    } else
      return await orderModel.findByIdAndUpdate(id, data, {
        new: true,
      });
  }

  async deleteOrder(orderId, user) {
    const doc = await orderModel.findById(orderId);
    if (!doc) throw { statusCode: 404, message: "Order not found." };
    if (user.id === doc.userId.toString() || user.role === "admin") {
      await orderModel.findByIdAndDelete(orderId);
      return;
    } else
      throw {
        statusCode: 403,
        message: "You are not authorized to update this review.",
      };
  }
}

module.exports = OrderRepository;
