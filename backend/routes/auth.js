const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/', 
passport.authenticate('local'));

module.exports = router;