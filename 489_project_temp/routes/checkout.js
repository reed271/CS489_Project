var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { findProduct, findByPk } = require('../models/Product');
const { findUser } = require('../models/User');

router.get('/', async function (req, res, next) {
    const user = req.session.user
    const products = await Product.findAll();
    let total = 0;
    for (item of products) {
        total += item.price;
    }
    res.render("checkout", { user, products, total })
});

router.post('/createOrder', async function (req, res, next) {
    console.log(req.body)
    /*
    {
    firstname: 'sdfas',
    email: 'asdasd',
    address: 'sadasd',
    city: 'asd',
    state: 'asdasd',
    zip: 'asda',
    cardname: 'adadasd',
    cardnumber: 'asdasd',
    expmonth: 'asdas',
    expyear: 'asdasd',
    cvv: 'asd',
    sameadr: 'on'
    }
    */
    res.redirect('/storefront')
});

module.exports = router;