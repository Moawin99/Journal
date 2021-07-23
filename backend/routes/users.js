require('dotenv').config();
const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.HOST,
	database: process.env.DB,
	password: process.env.PASSWORD,
	port: process.env.PORT
});


//DEV Route that gets all users
router.get('/', async (req, res) => {
	pool.query('SELECT * FROM users', (err, result) => {
		try {
			return res.status(200).json(result.rows);
		} catch (err) {
			return res.status(500).send('Error in getting Users');
		}
	});
});

//Gets Users from id
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	pool.query('SELECT * FROM users WHERE id = $1', [ id ], (err, result) => {
		try {
			if(result.rows[0] == null){
				return res.status(404).send('User not found');
			}
			return res.status(200).json(result.rows);
		} catch (err) {
			return res.status(500).send(err.message);
		}
	});
});

//Creates Users
router.post('/', async (req, res) => {
	const {username, password, first_name, last_name } = req.body;
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
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const {username, password, first_name, last_name } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	pool.query(
		'UPDATE users SET first_name = $1, last_name = $2, username = $3, password = $4 where id = $5',
		 [ first_name, last_name, username, hashedPassword, id ],
		  (err, result) => {
			  if(err){
				  return res.status(500).send(err);
			  }
			  return res.status(201).send('User Updated');
		}
	);
});

//Deletes users along with any entries they may have made
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
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
		 return res.sendStatus(204);
	});
});

module.exports = router;