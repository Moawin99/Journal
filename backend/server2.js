require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');

app.use(express.static("public"));
app.use(session({secret: process.env.ACCESS_TOKEN_SECRET}));
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(8000, () => {
    console.log('Server running on port 8000');
});