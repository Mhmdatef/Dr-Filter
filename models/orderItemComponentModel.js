const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemComponentSchema = new mongoose.Schema({
  orderItemId: {
    type: Schema.Types.ObjectId,
    ref: "OrderItem",
    required: true,
  },
  ingredientName: {
    type: String,
    required: [true, "An order item component must have an ingredient name"],
  },
  calculatedGrams: {
    type: Number,
    required: [true, "An order item component must have calculated grams"],
  },
  calories: {
    type: Number,
    required: [true, "An order item component must have calories "],
  },
});

const OrderItemComponent = mongoose.model("OrderItemComponent", orderItemComponentSchema);
module.exports = OrderItemComponent;