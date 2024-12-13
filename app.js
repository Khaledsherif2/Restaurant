require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

const uri = process.env.MONGO_URL;
const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("🚀 ~ connected to Database");
  } catch (e) {
    console.log("🚀 ~ connected to Database ~ error:", e);
    process.exit();
  }
};
connectToDB();

// user class
const UserRepository = require("./repositories/user.repository");
const UserController = require("./controllers/users.controller");

// user instance
const userReopsitory = new UserRepository();
const userController = new UserController(userReopsitory);

// menu class
const MenuRepository = require("./repositories/menu.repository");

// menu instance
const menuRepository = new MenuRepository();

// categories class
const CategoryRepository = require("./repositories/category.repository");

// categories instance
const categoryRepository = new CategoryRepository();

// order class
const OrderRepository = require("./repositories/order.repository");
const OrderController = require("./controllers/order.controller");

// order instance
const orderRepository = new OrderRepository();
const orderController = new OrderController(orderRepository, menuRepository);

// reservation class
const ReservationRepository = require("./repositories/reservation.repository");

// reservation instance
const reservationRepository = new ReservationRepository();

// review class
const ReviewRepository = require("./repositories/review.repository");

// review instance
const reviewRepository = new ReviewRepository();

// route
const userRoutes = require("./routers/users.routes");
const menuRoutes = require("./routers/menu.routes");
const categoryRoutes = require("./routers/category.routes");
const orderRoutes = require("./routers/order.routes");
const reservationRoutes = require("./routers/reservation.routes");
const reviewRoutes = require("./routers/review.routes");

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", userRoutes(userController));
app.use("/api/menu", menuRoutes(menuRepository));
app.use("/api/categories", categoryRoutes(categoryRepository));
app.use("/api/orders", orderRoutes(orderController));
app.use("/api/reservations", reservationRoutes(reservationRepository));
app.use("/api/reviews", reviewRoutes(reviewRepository));

app.use(errorHandler);

app.listen(process.env.PORT || 8888, () => {
  console.log(`🚀 ~ app.listen ~ port: ${process.env.PORT || 8888}`);
});
