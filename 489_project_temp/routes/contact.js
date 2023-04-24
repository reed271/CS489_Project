var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    const user = req.session.user
    res.render("contact", { user })
});

router.post('/submit', async function (req, res, next) {
    res.redirect('/storefront?msg=Your+feedback+was+submitted+successfully')
});

module.exports = router;