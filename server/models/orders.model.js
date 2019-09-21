const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  sender: { type: String, required: true },
  recieved: { type: String, required: true },
  amount: { type: Number, required: true },
  rating: { type: Number, required: false },
  rate: { type: Number, required: true }
}, {
  timestamps: true,
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
