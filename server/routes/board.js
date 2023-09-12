const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');
const authController = require('../controllers/auth');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, boardController.getIndex);

router.get('/user', authController.getUser);

module.exports = router;
