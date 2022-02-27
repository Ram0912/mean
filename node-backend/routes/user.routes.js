const express = require('express');
const app = express();

const userRoute = express.Router();
let user = require('../model/User');

// Add user
userRoute.route('/add-user').post((req, res, next) => {
    user.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All user
userRoute.route('/users').get((req, res) => {
    user.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get user
userRoute.route('/read-user/:id').get((req, res) => {
    user.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//login user
userRoute.route('/users/login').post((req, res)=>{
  console.log("request", req, "resoponse", res);
  var email = req.body.email;
  var password = req.body.password;
  user.find((error, data)=>{
    if (error) {
      return next(error)
    } else {
      console.log(data)
      data.forEach(doc => {
        if(doc._doc.mail === email && doc._doc.password === password)
          return res.json({success: true, users: data})
      });
      return res.json({success: false})
    }
  })

})


// Update user
userRoute.route('/update-user/:id').put((req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('user updated successfully!')
    }
  })
})

// Delete user
userRoute.route('/delete-user/:id').delete((req, res, next) => {
    user.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRoute;
