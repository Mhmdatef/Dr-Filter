const handlerFactory = require('./handlerFactoryController');
const Meal = require("../models/mealModel");
exports.getAllMeals = handlerFactory.getAll(Meal);
exports.getMealById = handlerFactory.getOne(Meal);
exports.createMeal = handlerFactory.createOne(Meal);
exports.updateMeal = handlerFactory.updateOne(Meal);
exports.deleteMeal = handlerFactory.deleteOne(Meal);