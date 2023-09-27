const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, boardController.getIndex);
router.get('/getBoards', boardController.getBoards);
router.get('/:id', boardController.getBoard);
router.post('/createBoard', boardController.createBoard);
router.post('/addTask', boardController.addTask);

module.exports = router;
