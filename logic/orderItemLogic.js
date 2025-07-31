const Meal = require("../models/mealModel");
exports.calculatePercentage = async (meal_id, requestedCalories) => {
  const meal = await Meal.findById(meal_id);
  if (!meal) throw new Error("Meal not found");

  if (!meal.basecalories || isNaN(meal.basecalories)) {
    throw new Error("Meal basecalories is invalid");
  }

  if (!meal.basecalories || isNaN(meal.basecalories)) {
    throw new Error("Invalid basecalories in meal");
  }

  const percentage = requestedCalories / meal.basecalories;

  return {
    percentage,
  };
};
