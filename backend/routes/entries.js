const express = require('express');
const router = express.Router();
const {Entry} = require('../config/dbconfig');

//Create new Entry
router.post('/:id', async (req, res) => {
	const newEntry = new Entry({
		title: req.body.title,
		mood: req.body.mood,
		entry: req.body.entry,
		user_id: req.params.id
	});
	try {
		await newEntry.save();
		res.status(200).json(newEntry);
	} catch (err) {
		res.json({error: err.message});
	}
});


//DEV ROUTE: Gets all entries
router.get('/all', async (req, res) => {
	try {
		const entries = await Entry.find();
	} catch (err) {
		res.json({error: err.message});
	}
});


//Gets all for one user
router.get('/:id', async (req, res) => {
	try {
		const entries = Entry.find({user_id: req.params.id});
		res.json(entries);
	} catch (err) {
		res.json({error: err.message});
	}
});

//Gets a single Entry
router.get('/single/:id', async (req, res) => {
	try {
		const singleEntry = await Entry.findById(req.params.id);
		res.send(singleEntry);
	} catch (err) {
		res.json({error: err.message});
	}
});


module.exports = router;