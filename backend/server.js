const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./queries');
const spotify = require('./spotifyQueries');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = 8000;

app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cookieParser());
app.use(cors()); 

app.get('/', (req, res) => {
	res.json({ info: 'Node app' });
});

app.get('/users', db.getUsers);
app.get('/users/:id', authenticateToken, db.getUserById);
app.post('/register', db.createUser);
app.post('/login', db.login);
app.post('/entry', authenticateToken, db.createEntry);
app.get('/entries', authenticateToken, db.getEntriesByUser);
app.put('/logout', authenticateToken, db.logout);
app.get('/spotify', spotify.getCode);
app.get('/callback', spotify.callback);
app.get('/me', spotify.getMe);
app.get(`/isLoggedSpotify`, spotify.isLoggedWithSpotify);

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
