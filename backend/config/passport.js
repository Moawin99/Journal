require('dotenv').config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('../queries');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.pool.query('SELECT id, username FROM users WHERE id = $1', [parseInt(id, 10)], (err, result) => {
        if(err){
            return done(err);
        }
        done(null, result.rows[0]);
    })
});

passport.use(new LocalStrategy((username, password, done) => {
    const user = db.queryToGetUser(username, password);
    if(!user){
        return done(null, false);
    }
    return done(null, user);
}));

// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.ACCESS_TOKEN_SECRET,
// },
// (jwtPayload, done) => {
//     if(Date.now() > jwtPayload.expires) {
//         return done('JWT Expired');
//     }
//     return done(null, jwtPayload.sub);
// }));

module.exports = { passport };