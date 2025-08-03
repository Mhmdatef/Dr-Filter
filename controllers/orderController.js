const handlerFactory = require("./handlerFactoryController");
const OrderItems = require("../models/orderItemModel");
const Order = require("../models/orderModel");
exports.createOrder = handlerFactory.createOne(Order);
exports.updateOrder = handlerFactory.updateOne(Order);
exports.deleteOrder = handlerFactory.deleteOne(Order);
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "userId",
        select: "name email -_id",
      })
      .populate({
        path: "items",
        select: "calculatedTotalWeight  price -_id",
        populate: "mealId",
      });
    if (Array.isArray(order.items)) {
      res.status(200).json({
        status: "success",
        data:  order.items.map((item) => ({
            itemName: item.mealId.name,
            itemDescription: item.mealId.description,
            itemPrice: item.price,
            itemCalories: item.requestedCalories,
          })),
        username: order.userId.name,
        email: order.userId.email,
        status: order.status,
        totalPrice: order.totalPrice,
      });
    } else
      res.status(200).json({
        status: "success",
        data: {
          itemName: order.itemId.mealId.name,
          itemDescription: order.itemId.mealId.description,
          itemPrice: item.price,
          itemCalories: item.requestedCalories,

          username: order.userId.name,
          email: order.userId.email,
          status: order.status,
          totalPrice: order.totalPrice,
        },
      });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "userId",
        select: "name email -_id",
      })
      .populate({
        path: "items",
        select: "calculatedTotalWeight  price -_id",
        populate: "mealId",
      });
    res.status(200).json({
      status: "success",
      data: orders.map((order) => ({
        items: order.items.map((item) => ({
          itemName: item.mealId.name,
          itemDescription: item.mealId.description,
          itemPrice: item.price,
          itemCalories: item.requestedCalories,
        })),
        username: order.userId.name,
        email: order.userId.email,
        status: order.status,
        totalPrice: order.totalPrice,
      })),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getOrderItemsByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderItems = await OrderItems.find({ orderId: orderId }).populate({
      path: "mealId",
      select: "name description priceperhundredcalories -_id",
    });
    console.log(req.params);
    console.log(orderItems);
    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No order items found for this order",
      });
    }
    res.status(200).json({
      status: "success",
      data: orderItems.map((item) => ({
        requestedCalories: item.requestedCalories,
        price: item.price,
        itemId: item._id,
        name: item.mealId.name,
        description: item.mealId.description,
        priceperhundredcalories: item.mealId.priceperhundredcalories,
      })),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
