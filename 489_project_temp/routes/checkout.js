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

// router.post('/createOrder', async function (req, res, next) {
//     try {
//         await Course.create(
//             {
//                 courseid: req.body.courseid,
//                 coursename: req.body.coursename,
//                 semester: req.body.semester,
//                 coursedesc: req.body.coursedesc,
//                 enrollnum: req.body.enrollnum
//             }
//         )
//         res.redirect('/courses?msg=success&courseid=' + req.body.courseid)
//     } catch (error) {
//         res.redirect('/courses?msg=' + new URLSearchParams(error.toString()).toString() + '&courseid' + req.body.courseid)
//     }
// });

module.exports = router;