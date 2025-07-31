const handlerFactory = require("./handlerFactoryController");
const Meal = require("../models/mealModel");
const MealsComponents = require("../models/mealComponentModel");
exports.getAllMeals = handlerFactory.getAll(Meal);
exports.getMealById = handlerFactory.getOne(Meal);
exports.createMeal = handlerFactory.createOne(Meal);
exports.updateMeal = handlerFactory.updateOne(Meal);
exports.deleteMeal = handlerFactory.deleteOne(Meal);
exports.getMealsComponents = async (req, res) => {
  const mealId = req.params.id;
  try {
    const mealsComponents = await MealsComponents.find({ meal_id: mealId });
    if (!mealsComponents || mealsComponents.length === 0) {
      return res
        .status(404)
        .json({ message: "No components found for this meal" });
    }
    res.status(200).json({
      status: "success",
      data: mealsComponents.map((component) => ({
        ingredient_name: component.ingredient_name,
        calories_per_hundred_grams: component.calories_per_hundred_grams,
      })),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
