//jshint esversion:6
const passport = require("passport");
const router = require('express').Router();
const axios = require('axios');
const request = require("request");
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
  first = req.body.f_name;
  last = req.body.l_name;
  User.register({username: req.body.username, f_name: req.body.f_name, l_name: req.body.l_name, phone:req.body.phone, teller:false, rate: 0}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        //console.log(`userID:${req.user._id}`);

        //Axios CapitalOne API Call
        let url = "http://api.reimaginebanking.com/customers?key=" + process.env.NESSY_DEV_KEY;
        // console.log("-------------------");
        // console.log(req.user.f_name);
        // console.log("-------------------");
        // console.log(req.user.l_name);

        let address = {
          street_number: "1600",
          street_name: "Havelock",
          city: "Spring",
          state: "Tx",
          zip: "77386"
        };

        const form = {
          first_name: first,
          last_name: last,
          address: address
        };


        axios.post(url, form)
          .then(resp => {
            // console.log("---------------");
            // console.log(resp.data.objectCreated._id);
            // console.log("---------------");

            User.findOneAndUpdate({"_id": req.user._id}, {"$set": {customer_id: resp.data.objectCreated._id}}).exec(function(err, user){
              if(err){
                console.log(err);
              }else{
                console.log("successfully made customer and added id");
              }

            });

          })
          .catch(err => console.log(err))

          let randomNum = Math.floor(Math.random() * 100 + 1);
          User.findOneAndUpdate({ "_id": req.user._id }, { "$set": {cashBalance:randomNum}}).exec(function(err, user){
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

//location services
router.route("/nearbyTeller/:money/:user_id").get((req, res) => {
  User.findOne({'_id': req.params.user_id}, 'location', (err, user) => {
    if(err) res.status(400).json('Error: ' + err);
    console.log(user);

    User.find({'teller': true}, 'f_name l_name rate location cashBalance', (err, availableTellers)=> {
      if(err) res.status(400).json('Error: ' + err);

      console.log(availableTellers);

      availableTellers = availableTellers.filter(teller => {
        return teller.cashBalance >= req.params.money
      })

      availableTellers = availableTellers.map(teller => {
        dist = 2 * 3961 * Math.asin(
          Math.sqrt(
            Math.pow(Math.sin((teller.location[0].lat - user.location[0].lat)/2),2) + Math.cos(user.location[0].lat)*Math.cos(teller.location[0].lat)*Math.pow(Math.sin((teller.location[0].long - user.location[0].long)/2),2)
          )
        );
        return [teller.f_name, teller.l_name, teller.rate, dist]
      });

      availableTellers.sort((a,b) => {return a.dist - b.dist})

      return res.json(availableTellers);
    })
  })
});

router.route('/logLocation').post((req,res) => {
  User.findById(req.session.id)
      .then(user => {
          user.location = {long: req.body.long, lat: req.body.lat}

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

router.route('/lastOrder').get((req, res)=> {
  Order.find()
    .then(orders => {
      lastOrder = []

      for(i=0;i<orders.length;i++){
        order=order[i];
        if(order.sender = req.session.id) {
          User.findById(order.reciever)
            .then(recepient => {
              lastOrder[0] = recepient.f_name + " " + recepient.l_name;
              lastOrder[1] = recepient.phone;
              lastOrder[2] = order.amount;
              lastOrder[3] = "Teller"
              res.json(lastOrder)
            })

          break;
        }
        else if(order.reciever = req.session.id) {
          User.findById(order.sender)
            .then(sender => {
              lastOrder[0] = sender.f_name + " " + sender.l_name;
              lastOrder[1] = sender.phone;
              lastOrder[2] = order.amount;
              lastOrder[3] = "Recipient"
              res.json(lastOrder)
            })

          break;
        }
      }

    })
})

router.route('/bankBalance').get((req,res) => {
  User.findById(req.session.id)
    .then(user => {
      axios.get(`http://api.reimaginebanking.com/customers/${user.customer_id}/accounts?key=${process.env.NESSY_DEV_KEY}`)
        .then(response => {
          res.json(response[0].balance)
        })
        .catch(err => res.json(err))
    })
})

module.exports = router;
