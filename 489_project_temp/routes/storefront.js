var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.get('/', function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    const user = req.session.user
    res.render("storefront", {user})
});





module.exports = router;