const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const { ensureAuth } = require('../middleware/auth');

router.put('/updateAccount', ensureAuth, accountController.updateAccount);

module.exports = router;
