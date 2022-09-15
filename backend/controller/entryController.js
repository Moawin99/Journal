const express = require("express");
const router = express.Router();
const entryService = require("../service/entryService");
const middleware = require("../middleware");

//get all entries for a single user
router.get("/:id", middleware.validateJwt, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const entries = await entryService.getEntriesByUserId(id);
    return res.status(200).send(entries);
  } catch (err) {
    return res.status(500).send("Error getting entries");
  }
});

//creates an entry for a single user
router.post("/:id", middleware.validateJwt, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const newEntry = await entryService.createEntry(req, id);
    return res.status(201).send(newEntry);
  } catch (err) {
    return res.status(500).send("Error creating entry");
  }
});

//deletes single entry
router.delete("/:id", middleware.validateJwt, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedEntry = await entryService.deleteEntry(id);
    return res.status(200).send(deletedEntry);
  } catch (err) {
    return res.status(500).send("Error deleting entry");
  }
});

//updates entry
router.put("/:id", middleware.validateJwt, async (req, res) => {
  try {
    const updatedEntry = await entryService.updateEntry(req);
    return res.status(200).send(updatedEntry);
  } catch (err) {
    return res.status(500).send("Error updating entry");
  }
});

module.exports = router;
