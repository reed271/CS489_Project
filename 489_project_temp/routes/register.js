var express = require('express');
var router = express.Router();
const User = require('../models/User');
const { emailValidator } = require('../validation');

router.get('/', function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    if (req.query.msg) {
      res.locals.msg = req.query.msg;
    }
    res.render("register")
});

router.post('/create', async function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    try {
      await emailValidator(req.body.email)
      await User.create(
        {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthdate: req.body.birthdate,
          address: req.body.address
        }
  
      )
      res.redirect('/')
      } catch (error) {
        res.redirect("/register?msg=" + new URLSearchParams(error.toString()).toString());
      }
});




module.exports = router;