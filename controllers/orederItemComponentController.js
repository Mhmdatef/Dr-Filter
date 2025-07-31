const OrderItems = require("../models/orderItemModel");
const OrderItemComponent = require("../models/orderItemComponentModel");
const { calculatePercentage } = require("../logic/orderItemLogic");
const Meal = require("../models/mealModel");
const MealComponent = require("../models/mealComponentModel");
exports.generateOrderItemComponentsFromMeal = async (orderItemId) => {
  try {
    const orderItem = await OrderItems.findById(orderItemId);
    if (!orderItem) {
      throw new Error("Order item not found");
    }
    mealId = orderItem.mealId;

    const meal = await Meal.findById(mealId);
    if (!meal) {
      throw new Error("Meal not found");
    }

    const { percentage } = await calculatePercentage(
      mealId,
      orderItem.requestedCalories
    );

    const mealComponents = await MealComponent.find({ meal_id: meal._id });
    if (!mealComponents || mealComponents.length === 0) {
      throw new Error("No components found for the meal");
    }

    const newComponents = mealComponents.map((component) => {
      const baseGrams = Number(component.basegrames);
      const caloriesPerGram =
        Number(component.calories_per_hundred_grams) / 100;

      const calculatedGrams = percentage * baseGrams;
      const calculatedCalories = calculatedGrams * caloriesPerGram;

      if (isNaN(calculatedGrams) || isNaN(calculatedCalories)) {
        throw new Error(
          `Invalid calculation for component ${component.ingredient_name}`
        );
      }

      return {
        orderItemId: orderItemId,
        ingredientName: component.ingredient_name,
        calculatedGrams: calculatedGrams,
        calories: calculatedCalories,
      };
    });

    const createdComponents = await OrderItemComponent.insertMany(
      newComponents
    );

    return createdComponents;
  } catch (error) {
    throw new Error(`Error generating order item components: ${error.message}`);
  }
};
