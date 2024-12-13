const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const orderRouter = (orderController) => {
  router.get("/", authentication, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        const orders = await orderController.getOrders();
        return res.status(200).json({ message: "Orders.", data: orders });
      } else throw { statusCode: 403, message: "You dont have permission." };
    } catch (e) {
      next(e);
    }
  });

  router.get("/user", authentication, async (req, res, next) => {
    try {
      const orders = await orderController.getUserOrders(req.user.id);
      return res.status(200).json({ message: "Orders.", data: orders });
    } catch (e) {
      next(e);
    }
  });

  router.post("/", authentication, validation, async (req, res, next) => {
    try {
      const order = await orderController.placeOrder(req.user.id, req.data);
      return res
        .status(201)
        .json({ message: "Order placed successfully.", data: order });
    } catch (e) {
      next(e);
    }
  });

  router.put("/:id", authentication, validation, async (req, res, next) => {
    try {
      const order = await orderController.updateOrder(req.params.id, req.data);
      return res
        .status(202)
        .json({ message: "Order updated successfully.", data: order });
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", authentication, async (req, res, next) => {
    try {
      await orderController.deleteOrder(req.params.id, req.user);
      return res.status(200).json({ message: "Order cancelled successfully." });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

module.exports = orderRouter;
