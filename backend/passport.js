require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

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

module.exports = { passport };