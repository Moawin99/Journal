const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({info: "random info"});
});

router.get('/about', (req, res, next) => {
    res.json({about: "this is a test"});
});

module.exports = router;