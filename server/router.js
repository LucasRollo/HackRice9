//jshint esversion:6

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
  console.log(req);
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){

        // User.findOneAndUpdate({ "_id": req.user.id }, { "$set": { "f_name": name, "l_name": lname,"genre": genre, "author": author, "similar": similar}}).exec(function(err, book){
        //   if(err) {
        //     console.log(err);
        //     res.status(500).send(err);
        //   } else {
        //     res.status(200).send(book);
        //   }
        // });

        //!Append Phone, Fname, and Lname to user record!
        res.redirect("/");
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
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
      });
    }
  });
});


module.exports = router;
