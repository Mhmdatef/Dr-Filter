const OrderItems = require("../models/orderItemModel");
const orderItemComponentController = require("./orederItemComponentController");
const Meal = require("../models/mealModel");

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
      return total + grams
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
