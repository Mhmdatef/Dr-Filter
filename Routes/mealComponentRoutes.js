const MealComponentController = require('../controllers/mealComponentsController');
const express = require('express');
const router = express.Router();

router.get('/', MealComponentController.getAllMealComponents)
router.get('/:id', MealComponentController.getMealComponentById);
router.post('/', MealComponentController.createMealComponent);
router.patch('/:id', MealComponentController.updateMealComponent);
router.delete('/:id', MealComponentController.deleteMealComponent);
module.exports = router;
