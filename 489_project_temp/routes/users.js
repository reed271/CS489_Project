var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product')
const { findProduct, findByPk } = require('../models/Product');
const { findUser } = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('respond with a USER TEST');
});

router.get('/editprofile', function(req, res, next) {
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
    req.session.user = user
    res.render('view_profile', {user})
  }else{
    res.redirect("/?msg=fail")
  }
});

router.get('/view_profile', async function(req, res, next) {
  //console.log(req.body.username+" - "+req.body.password);
  const user = await findUser(req.session.user.username, req.session.user.password)
  const products = await Product.findAll();
  var myShoppingCart = await user.getProducts() //returns user's shopping cart 
  var myProducts = []
  for (let product of products) {
    if (product.owner == user.username) {
      myProducts.push(product)
    }
  }
  res.render("view_profile", {user, myShoppingCart, myProducts})
});

module.exports = router;
