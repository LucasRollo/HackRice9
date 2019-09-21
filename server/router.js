//jshint esversion:6
const passport = require("passport");
const router = require('express').Router();
let User = require("./models/users.model");

//Login/Register

router.route('/').get((req,res) => {
  if (req.isAuthenticated()){
    res.render("/");
  } else {
    res.redirect("/login");
  }
});


router.route("/register").post((req, res) => {
  //only adds username and password to new User record (encrypted so we have to keep it like this for now)
  console.log(req.body);
  User.register({username: req.body.username, f_name: req.body.f_name, l_name: req.body.l_name, phone:req.body.phone,teller:false}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        console.log(`userID:${req.user._id}`);
        User.findOneAndUpdate({ "_id": req.user._id }, { "$set": { cashBalance:12345}}).exec(function(err, user){
          if(err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            res.status(200).send(user);
          }
        });
      });
    }
  });

});



router.route("/login").post((req, res) => {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.json({"status":"Wrong"});
    } else {
      passport.authenticate("local")(req, res, function(){
        res.json({"status":"Success"});
      });
      
    }
  });
  
});


module.exports = router;
