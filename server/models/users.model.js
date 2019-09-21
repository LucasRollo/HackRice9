const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  long: { type: Number, required: false },
  lat: { type: Number, required: false }
})

const userSchema = new Schema({
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  pass: { type: String, required: true },
  username: { type: String, required: true, unique: true, minLength: 7 },
  phone: { type: String, required: true },
  teller: { type: Boolean, required: true },
  rating: { type: Number, required: false },
  faves: { type: Array, required: false },
  sent_hist: { type: Array, required: false },
  recieved_hist: { type: Array, required: false },
  profit: { type: Number, required: false },
  customer_id: { type: String, required: false },
  location : [locationSchema]
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
