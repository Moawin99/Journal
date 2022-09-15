require("dotenv").config();
const LocalStragegy = require("passport-local").Strategy;
// const { pool } = require('./dbconfig');
const bcrypt = require("bcrypt");

function initialize(passport) {
  const autheticateUser = (username, password, done) => {
    pool.query(
      "SELECT * FROM users where username = $1",
      [username],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.rows.length > 0) {
          const user = result.rows[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is not correct" });
            }
          });
        } else {
          return done(null, false, { message: "User doesn't exist" });
        }
      }
    );
  };

  passport.use(
    new LocalStragegy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      autheticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users where id = $1", [id], (err, result) => {
      if (err) {
        throw err;
      }
      return done(null, result.rows[0]);
    });
  });
}

module.exports = initialize;
