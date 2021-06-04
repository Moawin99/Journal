require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('./passport');
// const db = require('./queries');
const auth = require('./routes/auth');


app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
// app.use(passport.session());
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.json({info: 'Node Server'});
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});