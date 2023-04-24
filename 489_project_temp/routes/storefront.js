var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { findProduct, findByPk } = require('../models/Product');
const { findUser } = require('../models/User');

router.get('/', async function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    const user = req.session.user
    const products = await Product.findAll();
    if (req.query.msg) {
      res.locals.msg = req.query.msg;
    }
    res.render("storefront", {user, products})
});

router.get('/sell_item', function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    const user = req.session.user
    res.render("sell_item", {user})
});

router.post('/sell_item/create', async function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    const user = req.session.user
    try {
        await Product.create(
          {
            id: req.body.id,
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            owner: user.username,
            sold: false
          }
    
      )
      res.redirect('/storefront')
      } catch (error) {
      res.redirect('/users') 
      }
    }
);

router.get('/addtocart/:name', async function(req, res, next) {
  //console.log(req.body.username+" - "+req.body.password);
  //const user = req.session.user
  const user = await findUser(req.session.user.username, req.session.user.password)
  const product = await findProduct(req.params.name)
  //console.log(product)
  await user.addProduct(product)
  //product.username = user.username
  //product.username = "caleb"
  await user.save()
  await product.save()
  //console.log("Product username = ", product.username)
  //user.addProduct(product)
  //console.log(await user.countProducts())
  res.redirect("/storefront?msg=Item+added+to+cart")
});

router.get('/removeProduct/:name', async function (req, res, next) {
  const user = await findUser(req.session.user.username, req.session.user.password)
  const product = await findProduct(req.params.name)
  await user.removeProduct(product)
  await user.save()
  await product.destroy()
  res.redirect('/storefront')
});

router.get('/shoppingCart', async function(req, res, next) {
  //console.log(req.body.username+" - "+req.body.password);
  //const user = req.session.user
  const user = await findUser(req.session.user.username, req.session.user.password)
  const products = await Product.findAll();
  var myProducts = await user.getProducts() //returns shopping cart contents
  res.render("shoppingCart", {user, myProducts})
  //res.redirect("/storefront")
  //res.render("shoppingCart", user, myProducts)
});

router.get('/search', async function(req, res, next) {
  res.redirect("/storefront")
});


module.exports = router;