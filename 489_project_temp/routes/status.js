var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { findUser } = require('../models/User');

router.get('/', async function (req, res, next) {
    const user = await findUser(req.session.user.username, req.session.user.password)
    var products = await user.getProducts()
    res.render("productStatusBuyer", { user, products })
});

module.exports = router;