const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const Theme = require('./themeModel.js')

router.post('/theme/edit', authMiddleware.authenticate, async (req, res) => {
    console.log('hello');
});

module.exports = router;