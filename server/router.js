//jshint esversion:6
const passport = require("passport");
const router = require('express').Router();
const axios = require('axios').Router();
let User = require("./models/users.model");
let Order = require("./models/orders.model")

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
    } else {
      passport.authenticate("local")(req, res, function(){
        res.json({"status":"logged in succesfully"});
      });
      res.json({"status":"logged in succesfully"});
    }
  });

});

//location services
router.route("/nearbyTeller/:money").get((req, res) => {
  User.findOne({'_id': req.session.id}, 'location', (err, user) => {
    if(err) res.status(400).json('Error: ' + err;

    User.find({'teller': true}, 'f_name l_name rate location cashBalance', (err, availableTellers)=> {
      if(err) res.status(400).json('Error: ' + err;

      availableTellers = availableTellers.filter(teller => {
        return teller.cashBalance >= req.params.money
      })

      availableTellers = availableTellers.map(teller => {
        dist = 2 * 3961 * Math.asin(
          Math.sqrt(
            Math.pow(Math.sin((teller.location.lat - user.location.lat)/2),2) + Math.cos(user.location.lat)*Math.cos(teller.location.lat)*Math.pow(Math.sin((teller.location.long - user.location.long)/2),2)
          )
        );
        return [teller.f_name, teller.l_name, teller.rate, dist]
      });

      return res.json(availableTellers);
    })
  })
});

router.route('/logLocation').post((req,res) => {
  User.findById(req.session.id)
      .then(user => {
          user.location = {long = req.body.long, lat = req.body.lat}

          user.save()
            .then(()=>res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: ' + err))
});

//update teller fields

router.route('/updateCashBalance').post((req, res) => {
  User.findById(req.session.id)
    .then(user => {
        user.cashBalance = req.body.money

        user.save()
          .then(()=>res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/updateRate').post((req, res) => {
  User.findById(req.session.id)
    .then(user => {
        user.rate = req.body.money

        user.save()
          .then(()=>res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/updateTeller').post((req, res) => {
  User.findById(req.session.id)
    .then(user => {
        user.teller = !user.teller

        user.save()
          .then(()=>res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/addOrder').post((req, res) => {
  const sender = req.body.sender;
  const reciever = req.session.id;
  const amount = req.body.amount;
  const rate = req.body.rate;

  const newOrder = new Order({
    sender,
    reciever,
    amount,
    rate,
  });

  newOrder.save()
    .then(() => res.json("Order saved"))
    .catch(err => res.status(400).json("Error: " + err))
});

module.exports = router;
