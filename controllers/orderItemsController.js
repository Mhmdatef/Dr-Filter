const OrderItems = require("../models/orderItemModel");
const OrderItemComponent = require("../models/orderItemComponentModel");
const orderItemComponentController = require("./orederItemComponentController");
const Meal = require("../models/mealModel");
const hanlerfactoryController = require("./handlerFactoryController");
exports.getAllOrderItems = hanlerfactoryController.getAll(OrderItems);
exports.updateOrderItem = hanlerfactoryController.updateOne(OrderItems);
exports.deleteOrderItem = hanlerfactoryController.deleteOne(OrderItems);
exports.getOrderItemById = async (req, res) => {
  const { orderItemId } = req.params;
  try {
    const orderItem = await OrderItems.findById(orderItemId);
    if (!orderItem) {
      return res
        .status(404)
        .json({ status: "error", message: "Order item not found" });
    }
    res.status(200).json({
      status: "success",
      data: orderItem,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createOrderItem = async (req, res) => {
  const { mealId, requestedCalories, orderId } = req.body;
  try {
    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    const price = requestedCalories * (meal.priceperhundredcalories / 100);
    const orderItem = await OrderItems.create({
      mealId,
      orderId,
      requestedCalories,
      price,
    });
    const components =
      await orderItemComponentController.generateOrderItemComponentsFromMeal(
        orderItem._id
      );
    if (!Array.isArray(components)) {
      return res.status(500).json({
        status: "error",
        message: "components is not an array",
        data: components,
      });
    }
    const calculatedTotalWeight = components.reduce((total, component) => {
      const grams = Number(component.calculatedGrams);
      return total + grams;
    }, 0);
    if (isNaN(calculatedTotalWeight)) {
      return res.status(500).json({
        status: "error",
        message: "calculatedTotalWeight is NaN",
      });
    }
    orderItem.calculatedTotalWeight = calculatedTotalWeight;
    await orderItem.save();
    res.status(201).json({
      status: "success",
      data: orderItem,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.getitemCompoents = async (req, res) => {
  const { orderItemId } = req.params;
  try {
    const components = await OrderItemComponent.find({ orderItemId });
    if (!components || components.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No components found for this order item",
      });
    }
    res.status(200).json({
      status: "success",
      data: components.map((component) => ({
        ingredientName: component.ingredientName,
        calculatedGrams: component.calculatedGrams,
        calories: component.calories,
      })),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
