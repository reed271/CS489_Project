const { auth, requiresAuth } = require('express-openid-connect');
const express = require("express")
const app = express()



const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'IHKUYFGhufwiuhfiluHilyg29584y6tiogfhuoTRqgyu',
  baseURL: 'http://localhost:3000',
  clientID: 'HYNEkKyxIvjvEkXi25ypxkqJnM1q39o8',
  issuerBaseURL: 'https://dev-wz05jpd36og87jww.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(express.static(__dirname + '/public'));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  res.render("index");
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(3000, () => {
    console.log("server started in port 3000");
})
