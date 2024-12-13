const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const userRouter = (userController) => {
  router.post("/register", validation, async (req, res, next) => {
    try {
      const user = await userController.register(req.data);
      return res
        .status(201)
        .json({ message: "user created successfully.", data: user });
    } catch (e) {
      next(e);
    }
  });

  router.post("/login", validation, async (req, res, next) => {
    try {
      const token = await userController.login(req.data);
      return res
        .status(200)
        .json({ message: "User logged in successfully.", token });
    } catch (e) {
      next(e);
    }
  });

  router.get("/profile", authentication, async (req, res, next) => {
    try {
      const user = await userController.profile(req.user);
      return res
        .status(200)
        .json({ message: "User profile data.", data: user });
    } catch (e) {
      next(e);
    }
  });

  router.put("/profile", authentication, validation, async (req, res, next) => {
    try {
      await userController.updateProfile(req.user.id, req.data);
      return res
        .status(202)
        .json({ message: "Profile data updated successfully." });
    } catch (e) {
      next(e);
    }
  });

  router.delete("/profile", authentication, async (req, res, next) => {
    try {
      await userController.deleteProfile(req.user.id);
      res.status(200).json({ message: "Profile deleted successfully." });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

module.exports = userRouter;
