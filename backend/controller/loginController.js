const express = require("express");
const router = express.Router();
const login = require("../service/loginService");

router.post("/", async (req, res) => {
  try {
    const token = await login(req);
    res.cookie("token", token);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});

module.exports = router;
