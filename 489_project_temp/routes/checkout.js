var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { findProduct, findByPk } = require('../models/Product');
const { findUser } = require('../models/User');
const { emailValidator, cityValidator, stateValidator, zipCodeValidator, yearValidator, monthValidator, cvvValidator } = require('../validation');

router.get('/', async function (req, res, next) {
    const user = await findUser(req.session.user.username, req.session.user.password)
    var products = await user.getProducts()
    let total = 0;
    for (item of products) {
        total += item.price
    }
    if (req.query.msg) {
        res.locals.msg = req.query.msg;
    }
    res.render("checkout", { user, products, total })
});

router.post('/createOrder', async function (req, res, next) {
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
    try {
        await emailValidator(req.body.email)
        await cityValidator(req.body.city)
        await stateValidator(req.body.state)
        await zipCodeValidator(req.body.zip)
        await yearValidator(req.body.expyear)
        await monthValidator(req.body.expmonth)
        await cvvValidator(req.body.cvv)
        res.redirect('/storefront')
    }
    catch (error) {
        res.redirect("/checkout?msg=" + new URLSearchParams(error.toString()).toString());
    }

});

router.get('/removeProduct/:name', async function (req, res, next) {
    const user = await findUser(req.session.user.username, req.session.user.password)
    const product = await findProduct(req.params.name)
    await user.removeProduct(product)
    await user.save()
    await product.save()
    res.redirect('/checkout')
});

module.exports = router;