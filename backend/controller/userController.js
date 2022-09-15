const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const middleware = require("../middleware");

router.get("/:id", middleware.validateJwt, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await userService.getUser(id);
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("Error getting users");
  }
});

router.post("/", async (req, res) => {
  const user = await userService.createUser(req, res);
  return res.status(201).send(user);
});

router.put("/:id", middleware.validateJwt, async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.updateUser(req, res, id);
  return res.status(200).send(user);
});

router.delete("/:id", middleware.validateJwt, async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.deleteUser(id, res);
  return res.status(200).send(user);
});

module.exports = router;
