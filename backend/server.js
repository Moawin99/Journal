require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { urlencoded } = require('express');
const port = 8000;
const users = require('./routes/users');
const entries = require('./routes/entries');

app.use(express.json());
app.use(urlencoded({
	extended: true
}));

app.get('/', (req, res) => {
	res.json({ info: 'Node app' });
});
app.use('/users', users);
app.use('/entries', entries);


// app.get('/users', db.getUsers);
// app.get('/users/:id', authenticateToken, db.getUserById);
// app.post('/register', db.createUser);
// app.post('/login', db.login);
// app.post('/entry', authenticateToken, db.createEntry);
// app.get('/entries', authenticateToken, db.getEntriesByUser);
// app.put('/logout', authenticateToken, db.logout);
// app.get('/spotify', spotify.getCode);
// app.get('/callback', spotify.callback);
// app.get('/me', spotify.getMe);
// app.get(`/isLoggedSpotify`, app.set('Cache-Control', 'no-store'),  spotify.isLoggedWithSpotify);

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
