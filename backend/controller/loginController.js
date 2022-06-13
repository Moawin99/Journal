const express = require("express");
const router = express.Router();
const loginService = require("../service/loginService");

router.post("/", async (req, res) => {
  try {
    const token = await loginService.login(req);
    res.cookie("token", token);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});
