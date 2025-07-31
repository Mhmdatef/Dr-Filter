const handlerFactory = require("./handlerFactoryController");
const Order = require("../models/orderModel");
exports.getAllOrders = handlerFactory.getAll(Order, {
  path: "orderItems",
  select: "name requestedCalories calculatedTotalWeight price",
});
exports.getOrderById = handlerFactory.getOne(Order, {
  path: "orderItems",
  select: "name requestedCalories calculatedTotalWeight price",
});
exports.createOrder = handlerFactory.createOne(Order);
exports.updateOrder = handlerFactory.updateOne(Order);
exports.deleteOrder = handlerFactory.deleteOne(Order);