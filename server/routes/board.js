const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, boardController.getIndex);

module.exports = router;
