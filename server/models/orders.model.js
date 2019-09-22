const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  sender: { type: String, required: true },
  reciever: { type: String, required: true },
  amount: { type: Number, required: true },
  rate: { type: Number, required: true },
  completeSender: { type: Boolean, required: true },
  completeReciever: { type: Boolean, required: true }
}, {
  timestamps: true,
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
