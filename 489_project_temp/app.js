var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const sequelize = require('./db')
const User = require('./models/User')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require("./routes/register")
var storefrontRouter = require("./routes/storefront");
const Product = require('./models/Product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'wsu489proj',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/storefront', storefrontRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


async function setup() {
  /*
  const reed = await User.create({ username: "reed", password: "1234", email: "reed.havens@wsu.edu", birthdate: "06-17-99", address: "14511 25th Ave SE"});
  const product = await Product.create({
    id: "001",
    name: "Reed Test Product #1",
    desc: "This is a test product, intended only to be used in the testing environemnt. This should be removed before submission.",
    price: 99.99,
    owner: "Admin",
    sold: false
  })
  const product2 = await Product.create({
    id: "002",
    name: "Reed Test Product #2",
    desc: "This is a SOLD test product, intended only to be used in the testing environemnt. This should be removed before submission. This should NOT be visible on storefront",
    price: 100.00,
    owner: "reed",
    sold: true
  })
  */
  console.log("reed instance created...")
}


sequelize.sync({ force: false}).then(()=>{
  console.log("Sequelize Sync Completed...");
  setup().then(()=> console.log("User setup complete"))
})

//INSERT INTO USER VALUES ('reed', '1234', 'reed.havens@wsu.edu' '06/17/99', '14511 25th Ave SE');


module.exports = app;
