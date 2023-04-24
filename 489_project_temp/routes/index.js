var express = require('express');
var router = express.Router();
const User = require('../models/User');

const sessionChecker = (req, res, next)=>{
  if(req.session.user){
    console.log(req.session.user)
  }else{
    console.log("NO user found")
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.msg) {
    res.locals.msg = req.query.msg;
  }
  res.render('login', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  const user = req.session.user
  if (req.query.msg) {
    res.locals.msg = req.query.msg;
  }
  res.render('index', { user });
});

router.post('/login', async function(req, res, next) {
  //console.log(req.body.username+" - "+req.body.password);
  const user = await User.findUser(req.body.username, req.body.password)
  if(user!== null){
    req.session.user = user
    res.redirect('/storefront')
  }else{
    res.redirect("/?msg=" + new URLSearchParams("Invalid username or password").toString());
  }
});

router.get('/editprofile', function(req, res, next) {
  if (req.query.msg) {
    res.locals.msg = req.query.msg;
  }
  res.render('edit_profile');
});

router.post('/editprofile/postchange', async function(req, res, next) {
  const user = await User.findUser(req.session.user.username, req.session.user.password)
  if(user!== null){
    user.update({
      address: req.body.address,
      email: req.body.email
    } )
    await user.save()
    if (req.query.msg) {
      res.locals.msg = req.query.msg;
    }
    res.render("index", {user});
  }else{
    res.redirect("/?msg=fail")
  }
});


module.exports = router;
