const handlerFactory = require("./handlerFactoryController");
const OrderItems = require("../models/orderItemModel");
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
exports.getOrderItemsByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderItems = await OrderItems.find({ orderId: orderId });
    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No order items found for this order",
      });
    }
    res.status(200).json({
      status: "success",
      data: orderItems,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};