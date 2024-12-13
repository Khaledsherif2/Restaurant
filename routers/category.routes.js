const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const categoryRouter = (categoryRepository) => {
  router.get("/", async (req, res, next) => {
    try {
      const categories = await categoryRepository.getCategories();
      return res.status(200).json({ message: "Categories.", data: categories });
    } catch (e) {
      next(e);
    }
  });

  router.post("/", authentication, validation, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        await categoryRepository.addCategory(req.data);
        return res.status(201).json({ message: "Category add successfully." });
      } else throw { statusCode: 403, message: "You dont have permission." };
    } catch (e) {
      next(e);
    }
  });

  router.put("/:id", authentication, validation, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        await categoryRepository.updateCategory(req.params.id, req.data);
        return res
          .status(202)
          .json({ message: "Category updated successfully." });
      } else throw { statusCode: 403, message: "You dont have permission." };
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", authentication, async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        await categoryRepository.deleteCategory(req.params.id, req.data);
        return res
          .status(200)
          .json({ message: "Category deleted successfully." });
      } else throw { statusCode: 403, message: "You dont have permission." };
    } catch (e) {
      next(e);
    }
  });

  return router;
};

module.exports = categoryRouter;
