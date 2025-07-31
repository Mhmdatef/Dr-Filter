const MealComponents = require("../models/mealComponentModel");
const handlerFactory = require("./handlerFactoryController");
exports.getAllMealComponents = handlerFactory.getAll(MealComponents, {
  path: "meal_id",
  select: "name -_id",
});
exports.getMealComponentById = handlerFactory.getOne(MealComponents, {
  path: "meal_id",
  select: "name -_id",
});
exports.createMealComponent = handlerFactory.createOne(MealComponents);
exports.updateMealComponent = handlerFactory.updateOne(MealComponents);
exports.deleteMealComponent = handlerFactory.deleteOne(MealComponents);
