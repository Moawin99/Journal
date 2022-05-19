const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

/**
 * TODO: Add authentication
 */

router.get('/:id', async (req, res) => {
	try {
		const user = await userService.getUser(req.params.id);
		return res.status(200).send(user);
	} catch (err) {
		return res.status(500).send('Error getting users');
	}
});

router.post('/', async (req, res) => {
	const user = await userService.createUser(req, res);
	return res.status(201).send(user);
});

router.put('/', async (req, res) => {
	const user = await userService.updateUser(req, res);
	return res.status(200).send(user);
});

router.delete('/', async (req, res) => {
	const user = await userService.deleteUser(req, res);
	return res.status(200).send(user);
});

module.exports = router;
