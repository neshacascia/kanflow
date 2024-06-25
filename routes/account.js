const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const accountController = require('../controllers/account');
const { ensureAuth } = require('../middleware/auth');

router.put('/updateAccount', ensureAuth, accountController.updateAccount);
router.post(
  '/updateAvatar',
  upload.single('avatar'),
  accountController.updateAvatar
);

module.exports = router;
