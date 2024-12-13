const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const menuRouter = (menuRepository) => {
  router.get("/", async (req, res, next) => {
    try {
      const menu = await menuRepository.getMenu();
      return res.status(200).json({ message: "Menu items.", data: menu });
    } catch (e) {
      next(e);
    }
  });

  router.get("/search", async (req, res, next) => {
    try {
      const items = await menuRepository.search(req.query);
      return res
        .status(200)
        .json({ message: "Search menu items.", data: items });
    } catch (e) {
      next(e);
    }
  });

  router.post("/", authentication, validation, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        const item = await menuRepository.addItem(req.data);
        return res
          .status(201)
          .json({ message: "Menu item add successfully.", data: item });
      } else throw { statusCode: 403, message: "You dont have permission." };
    } catch (e) {
      next(e);
    }
  });

  router.put("/:id", authentication, validation, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        await menuRepository.updateItem(req.params.id, req.data);
        return res
          .status(202)
          .json({ message: "Menu item updated successfully." });
      } else throw { statusCode: 403, message: "You dont have permission." };
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", authentication, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        await menuRepository.deleteItem(req.params.id);
        return res
          .status(200)
          .json({ message: "Menu item deleted successfully." });
      } else throw { statusCode: 403, message: "You dont have permission." };
    } catch (e) {
      next(e);
    }
  });

  return router;
};

module.exports = menuRouter;
