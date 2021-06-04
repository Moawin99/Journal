require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.HOST,
	database: process.env.DB,
	password: process.env.PASSWORD,
	port: process.env.PORT
});

const getUsers = (req, res) => {
	pool.query('SELECT * FROM users', (err, result) => {
		try {
			return res.status(200).json(result.rows);
		} catch (err) {
			return res.status(500).send('Error in Get Users');
		}
	});
};

const getUserById = (req, res) => {
	const id = parseInt(req.params.id);
	pool.query('SELECT * FROM users WHERE id = $1', [ id ], (err, result) => {
		try {
			return res.status(200).json(result.rows);
		} catch (err) {
			return res.status(500).send('Error in get User by Id');
		}
	});
};

const createUser = async (req, res) => {
	const { username, password, first_name, last_name } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	pool.query(
		'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)',
		[ first_name, last_name, username, hashedPassword ],
		(err, result) => {
			if (err) {
				return res.status(500).send('Error occured with creation');
			}
			return res.status(201).send('User added');
		}
	);
};

const login = (req, res) => {
	const { username, password } = req.body;
	pool.query('SELECT * FROM users WHERE username = $1', [ username ], async (err, result) => {
		if (result.rows.length === 0) {
			return res.status(400).send('Username does not exsist');
		}
		try {
			if (await bcrypt.compare(password, result.rows[0].password)) {
				const temp = result.rows[0];
				const user = {
					id: temp.id,
					username: temp.username
				};
				const accessToken = generateAccessToken(user);
				res.cookie('accessToken', accessToken, { maxAge: 2700000, httpOnly: true, sameSite: 'None', secure: true});
				res.status(200).send('User Logged in');
				return res.end();
			}
			return res.status(500).send('Password incorrect');
		} catch (err) {
			return res.status(500).send('Could not login');
		}
	});
};

const createEntry = (req, res) => {
	const { title, mood, entry } = req.body;
	const userId = req.user.id;
	pool.query(
		'INSERT INTO entries (title, mood, entry, user_id) VALUES ($1, $2, $3, $4)',
		[ title, mood, entry, userId ],
		(err, result) => {
			if (err) {
				return res.status(500).send('Error on first query');
			}
			return res.status(200).send('Entry added!')
		}
	);
};

const getEntriesByUser = (req, res) => {
	const userId = req.user.id;
	pool.query('SELECT * FROM entries WHERE user_id = $1', [ userId ], (err, result) => {
		try {
			return res.status(200).json(result.rows);
		} catch (err) {
			return res.status(500).send('Unable to fetch entires');
		}
	});
};

const logout = (req, res) => {
	res.clearCookie('accessToken');
	return res.end();
};

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45m' });
}

const queryToGetUser = (username) => {
	pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
		try {
			return result.rows;
		} catch (err) {
			return err;
		}
	})
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	login,
	createEntry,
	logout,
	getEntriesByUser,
	queryToGetUser
};
