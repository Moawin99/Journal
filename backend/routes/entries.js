require('dotenv').config();
const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.HOST,
	database: process.env.DB,
	password: process.env.PASSWORD,
	port: process.env.PORT
});

//Dev route that gets all entries
router.get('/', async (req, res) => {
	try {
		const { rows } = await pool.query('SELECT * FROM entries');
		return res.status(200).send(rows);
	} catch (err) {
		return res.status(500).send('Error getting entries');
	}
});


//Gets all entries for a single user
router.get('/:id', async (req, res) => {
	const id = req.params;
	try {
		const { rows } = await pool.query('SELECT * FROM entries where id = $1', [ id ]);
		return res.status(200).send(rows);
	} catch (err) {
		return res.status(500).send('Error in getting users entries');
	}
});

//creates an entry for a single user
router.post('/:id', async (req, res) => {
	const id = req.params;
	const { title, mood, entry, user_id } = req.body;
	pool.query('INSERT INTO entries (title, mood, entry, user_id) VALUES ($1, $2, $3, $4)',
	[ title, mood, entry, user_id ],
	(err, result) => {
		if(err){
			return res.status(500).send('Error creating entry');
		}
		return res.status(201).send('entry Created');
	});
});


//Updates entry
router.put('/:id', async (req, res) => {
	const id = req.params;
	const { title, mood, entry } = req.body;
	pool.query('UPDATE entries SET title = $1, mood = $2, entry = $3 where id = $4',
	[ title, mood, entry, id ], 
	(err, result) => {
		if(err){
			return res.status(500).send('Error in updating entry');
		}
		return res.status(201).send('Entry updated');
	});
});

//deletes single entry
router.delete('/:id', async (req, res) => {
	const id = req.params;
	pool.query('DELETE FROM entries where id = $1', [ id ],
	(err, result) => {
		if(err){
			return res.status(500).send('Error in deleting entry');
		}
		return res.status(204).send('entry deleted');
	});
});

module.exports = router;