const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderItemSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  mealId: {
    type: Schema.Types.ObjectId,
    ref: 'Meal',
    required: true,
  },
  requestedCalories: {
    type: Number,
    required: true,
  },
  calculatedTotalWeight: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true 
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
