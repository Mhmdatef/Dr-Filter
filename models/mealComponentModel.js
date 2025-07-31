const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealComponentSchema = new mongoose.Schema({
  meal_id: {
    type: Schema.Types.ObjectId,  
    ref: "Meal",
    required: [true, "A meal component must belong to a meal"],
  },
  ingredient_name: {
    type: String,
    required: [true, "A meal component must have a name"],
    trim: true, 
  },
  basegrames: { 
    type: Number,
    required: [true, "A meal component must have base grams"],
    min: [0, "Base grams must be a positive number"], 
  },
  calories_per_hundred_grams: {
    type: Number,
    required: [true, "A meal component must have calories per hundred grams"],
    min: [0, "Calories must be a positive number"],  
  },
});

const MealComponent = mongoose.model("MealComponent", mealComponentSchema);

module.exports = MealComponent;
