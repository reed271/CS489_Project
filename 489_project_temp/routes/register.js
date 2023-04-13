var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.get('/', function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    res.render("register")
});

router.post('/create', async function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    try {
        await User.create(
          {
            username: req.body.username,
            password: req.body.password,
            birthdate: req.body.birthdate,
            address: req.body.address
          }
    
      )
      res.redirect('/home')
      } catch (error) {
      res.redirect('/users') 
      }
});




module.exports = router;