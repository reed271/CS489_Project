var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product')

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






module.exports = router;