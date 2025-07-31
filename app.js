const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const app = express();
app.use(cors());

const mealRoutes = require("./Routes/mealRoutes.js");
const mealComponentRoutes = require("./Routes/mealComponentRoutes.js");
const authRoutes = require("./Routes/authRoutes.js");
const userRoutes = require("./Routes/userRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");
const orderItemsRoutes = require("./Routes/orderItemsRoutes.js");
// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/meals", mealRoutes);
app.use("/api/v1/mealComponents", mealComponentRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/orderItems",orderItemsRoutes);
module.exports = app;
