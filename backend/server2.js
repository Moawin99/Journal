require('dotenv').config();
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const passport = require('passport');
const db = require('./queries');
const entries = require('./routes/entries');
const users = require('./routes/users');
// const auth = require('./routes/auth');
// const rand = require('./routes/random');

app.use(express.json());
app.use(urlencoded({
    extended: true
}));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/login', auth);
// app.use('/random', rand);
app.use('/entries', entries);
app.use('/users', users);
app.post('/register', db.createUser);


app.get('/', (req, res) => {
    res.json({info: 'Node Server'});
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
