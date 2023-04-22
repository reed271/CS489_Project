var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { findProduct, findByPk } = require('../models/Product');
const { findUser } = require('../models/User');

router.get('/', async function(req, res, next) {
    const user = req.session.user
    const products = await Product.findAll();
    let total = 0;
    for (item of products) {
        total += item.price;
    }
    res.render("checkout", {user, products, total})
});

module.exports = router;