const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, boardController.getIndex);
router.get('/getBoards', boardController.getBoards);
router.get('/:id', boardController.getBoard);
router.post('/createBoard', boardController.createBoard);
router.put('/editBoard', boardController.editBoard);
router.post('/addTask', boardController.addTask);
router.put('/editTask', boardController.editTask);
router.put('/updateStatus', boardController.updateStatus);
router.put('/setCompletionStatus', boardController.setCompletionStatus);
router.delete('/delete', boardController.delete);

module.exports = router;
