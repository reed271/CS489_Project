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
            owner: user.username
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
  console.log(user)
  await user.addProduct(product)
  console.log(await user.getProducts())
  //product.username = user.username
  //product.username = "caleb"
  await user.save()
  await product.save()
  //console.log("Product username = ", product.username)
  //user.addProduct(product)
  //console.log(await user.countProducts())
  res.redirect("/storefront")
});

router.get('/shoppingCart', async function(req, res, next) {
  //console.log(req.body.username+" - "+req.body.password);
  //const user = req.session.user
  const user = await findUser(req.session.user.username, req.session.user.password)
  const products = await Product.findAll();
  var myProducts = await user.getProducts()
  //console.log(products)
  /*
  for (let product of products) {
    console.log("\n\nINSIDE LOOP\n\n")
    console.log(product)
    console.log(product.username)
    console.log(user.username)
    if (product.username == user.username) {
      console.log("\n\nINSIDE LOOP\n\n")
      console.log(product.username)
      console.log(user.username)
      myProducts.push(product)
    }
  }
  */
  console.log(myProducts)
  res.render("shoppingCart", {user, myProducts})
  //res.redirect("/storefront")
  //res.render("shoppingCart", user, myProducts)
});








module.exports = router;