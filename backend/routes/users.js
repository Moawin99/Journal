const express = require('express');
const router = express.Router();
const {User} = require('../config/dbconfig');

//Create new User
router.post('/', async (req, res) => {
	const newUser = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		username: req.body.username,
		password: req.body.password
	});
	try {
		await newUser.save();
		res.status(200).json(newUser);
	} catch (err) {
		res.json({error: err.message});
	}
});

// DEV ROUTE: Gets all users
router.get('/all', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.json({error: err.message});
	}
});


//Gets User based on id
router.get('/:id', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		res.send(foundUser);
	} catch (err) {
		res.json({error: err.message});
	}
});

//updates user, Need to update username bc uniquness
router.put('/:id', async (req, res) => {
	try {
	const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		password: req.body.password
	});
	res.status(204).json(updatedUser);
	} catch (err) {
		res.json({error: err.message});
	}
});

router.delete('/:id', async (req, res) => {
	try {
	const deletedUser = await User.findOneAndDelete(req.params.id);
	res.status(202).json(deletedUser);
	} catch (err) {
		res.json({error: err.message});
	}
});

module.exports = router;