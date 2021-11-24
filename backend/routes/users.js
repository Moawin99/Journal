require('dotenv').config();
const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pool = require('pg').Pool;
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.HOST,
	database: process.env.DB,
	password: process.env.PASSWORD,
	port: process.env.PORT
});

router.get('/test', async(req, res) => {
	return res.status(200).send({message: "test is working"});
})

//DEV Route that gets all users
router.get('/', async (req, res) => {
	console.log("gets here");
	pool.query('SELECT * FROM users', (err, result) => {
		try {
			return res.status(200).json(result.rows);
		} catch (err) {
			console.log(err);
			return res.status(500).send('Error in getting Users');
		}
	});
});

//Gets Users from id
router.get('/me', connectEnsureLogin.ensureLoggedIn(),  async (req, res) => {
	res.status(201).send({user: req.user});
});


//Creates Users
router.post('/', async (req, res) => {
	const {username, password, first_name, last_name } = req.body;
	if(username === null || password === null || first_name === null || last_name === null){
		return res.status(500).send({error: "Not all arguments present"});
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	pool.query(
		'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)',
		 [ first_name, last_name, username, hashedPassword ],
		  (err, result) => {
			  if(err){
				  return res.status(500).send('Error with creation');
			  }
			  return res.status(201).send('User Added');
		}
	);
});

//Updates Users, Need to test out if i can do this or if i have to send the whole user obj form the frontend
router.put('/', connectEnsureLogin.ensureLoggedIn(),  async (req, res) => {
	const id = req.user.id;
	const {username, password, first_name, last_name } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const updatedUser = {
		id,
		first_name,
		last_name,
		username,
		password: hashedPassword
	};
	pool.query(
		'UPDATE users SET first_name = $1, last_name = $2, username = $3, password = $4 where id = $5',
		 [ first_name, last_name, username, hashedPassword, id ],
		  (err, result) => {
			  if(err){
				  return res.status(500).send(err);
			  }
			  return res.status(201).send({user: updatedUser});
		}
	);
});

//Deletes users along with any entries they may have made
router.delete('/', connectEnsureLogin.ensureLoggedIn() , async (req, res) => {
	const id = req.user.id;
	req.logOut();
	pool.query('DELETE FROM entries where user_id = $1', [ id ], 
	(err, result) => {
		if(err){
			return res.status(500).send('Error in deleting entries');
		}
	});
	pool.query('DELETE FROM users where id = $1', [ id ],
	 (err, result) => {
		 if(err){
			return res.status(500).send('Error with Deleting user');
		 }
		 return res.status(204).send({message: "Sucessfully deleated user"});
	});
});

//Logs user in with Passport middleware and creates a session
router.post('/login', passport.authenticate('local'), async (req, res) => {
	req.logIn(req.user, (err) => {
		if(err){
			return res.status(401).send({message: "Something went wrong logging in!"});
		}
	return res.status(200).send({user: req.user});
	})
});

//logs user out and ends session
router.post('/logout', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	req.logout();
	res.status(200).send({message: "Successfully logged out!"});
});

module.exports = router;
