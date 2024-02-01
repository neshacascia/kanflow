const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');
const { ensureGuest, ensureAuth } = require('../middleware/auth');

router.get('/getBoards', ensureAuth, boardController.getBoards);
router.get('/:id', ensureAuth, boardController.getBoard);
router.post('/createBoard', ensureAuth, boardController.createBoard);
router.put('/editBoard', ensureAuth, boardController.editBoard);
router.post('/addTask', ensureAuth, boardController.addTask);
router.put('/editTask', ensureAuth, boardController.editTask);
router.put('/updateStatus', ensureAuth, boardController.updateStatus);
router.put(
  '/setCompletionStatus',
  ensureAuth,
  boardController.setCompletionStatus
);
router.delete('/delete', ensureAuth, boardController.delete);

module.exports = router;
