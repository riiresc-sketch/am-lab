const express = require('express');
const router = express.Router();

// karena file lu sejajar: status.js, stats.js, send.js, verify.js, tempmail.js
router.use('/status', require('./status'));
router.use('/tempmail', require('./tempmail'));
router.use('/send-link', require('./send'));
router.use('/verify-link', require('./verify'));
router.use('/stats', require('./stats'));

module.exports = router;