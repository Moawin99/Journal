require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const app = express();
const jwt = require('jsonwebtoken');
const { urlencoded } = require('express');
const port = 8000;
const users = require('./routes/users');
const entries = require('./routes/entries');
const spotify = require('./routes/spotify');
const passport = require('passport');
const initializePassport = require('./config/passport');

initializePassport(passport);

app.use(express.json());
app.use(urlencoded({
	extended: true
}));
app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.json({ info: 'Node app' });
});

app.use('/users', users);
app.use('/entries', entries);
app.use('/spotify', spotify);

function authenticateToken(req, res, next) {
	const cookies = req.cookies;
	const token = cookies.accessToken;

	if (token === null) {
		return res.sendStatus(401);
	}
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.user = user;
		next();
	});
}

app.listen(port, () => {
	console.log(`Server running on port:${port}`);
});
