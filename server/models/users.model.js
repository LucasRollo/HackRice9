//jshint esversion:6
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

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

//place right below user schema
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

//place right below model
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


module.exports = User;
