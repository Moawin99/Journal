require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const db = require('./queries');


app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());

passport.use(new LocalStrategy(
    async (username, password, done) => {
    try {
    const userObj = db.queryToGetUser(username);
    const passwordsMatch = await bcrypt.compare(password, userObj.password);

    if(passwordsMatch){
        return done(null, userObj);
    }
    else {
        return done('Incorrect Username / Password');
    }
    }
    catch(error) {
        done(error);
    }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
},
(jwtPayload, done) => {
    if(Date.now() > jwtPayload.expires) {
        return done('JWT Expired');
    }

    return done(null, jwtPayload);
}))

app.listen(8000, () => {
    console.log('Server running on port 8000');
});