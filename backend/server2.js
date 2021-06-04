require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('./config/passport');
const db = require('./queries');
const auth = require('./routes/auth');


app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use('/login', auth);
app.post('/register', db.createUser);

app.get('/', (req, res) => {
    res.json({info: 'Node Server'});
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});