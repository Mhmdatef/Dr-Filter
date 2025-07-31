const MealController = require('../controllers/mealController');
const express = require('express');
const router = express.Router();

router.get('/', MealController.getAllMeals)
router.get('/:id', MealController.getMealById);
router.post('/', MealController.createMeal);
router.patch('/:id', MealController.updateMeal);
router.delete('/:id', MealController.deleteMeal);
router.get('/:id/components', MealController.getMealsComponents);
module.exports = router;
