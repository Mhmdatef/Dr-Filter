const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A meal must have a name"],
  },
  basecalories: {
    type: Number,
    required: [true, "A meal must have base calories"],
  },
  priceperhundredcalories: {
    type: Number,
    required: [true, "A meal must have a price per hundred calories"],
  },
  description: {
    type: String,
    required: [true, "A meal must have a description"],
  },
});
const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;