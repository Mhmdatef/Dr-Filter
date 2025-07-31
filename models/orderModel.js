const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderchema = new mongoose.Schema({
  userId: {
    type:Schema.Types.ObjectId,
    ref: "User",
    required: [true, "An order must belong to a user"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderchema);
module.exports = Order;