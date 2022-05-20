const express = require('express');
const router = express.Router();
const entryService = require('../service/entryService');

//get all entries for a single user
router.get('/', async (req, res) => {
	try {
		const entries = await entryService.getEntriesByUserId(req);
		return res.status(200).send(entries);
	} catch (err) {
		return res.status(500).send('Error getting entries');
	}
});

//creates an entry for a single user
router.post('/', async (req, res) => {
	try {
		const newEntry = await entryService.createEntry(req);
		return res.status(201).send(newEntry);
	} catch (err) {
		return res.status(500).send('Error creating entry');
	}
});

//deletes single entry
router.delete('/:id', async (req, res) => {
	try {
		const deletedEntry = await entryService.deleteEntry(req);
		return res.status(200).send(deletedEntry);
	} catch (err) {
		return res.status(500).send('Error deleting entry');
	}
});

//updates entry
router.put('/:id', async (req, res) => {
	try {
		const updatedEntry = await entryService.updateEntry(req);
		return res.status(200).send(updatedEntry);
	} catch (err) {
		return res.status(500).send('Error updating entry');
	}
});

module.exports = router;
