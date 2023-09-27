const path = require('path');
const Board = require('../models/Board');
const Task = require('../models/Task');

module.exports = {
  getIndex: (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
  },
  getBoards: async (req, res) => {
    console.log(req.user);

    try {
      const boards = await Board.find({ userId: req.user.id }).lean();
      res.status(200).json({ boards: boards, user: req.user.id });
    } catch (err) {
      console.error(err);
    }
  },
  createBoard: async (req, res) => {
    try {
      await Board.create({
        name: req.body.boardName,
        columns: req.body.columnName,
        userId: req.user.id,
      });
      console.log('Board has been added');
      res.redirect('/board');
    } catch (err) {
      console.error(err);
    }
  },
  addTask: async (req, res) => {
    try {
      await Task.create({
        title: req.body.taskData.title,
        description: req.body.taskData.description,
        subtasks: req.body.taskData.subtasks,
        status: req.body.taskData.status,
        boardId: req.body.taskData.id,
      });
      console.log('Task has been added');
      res.status(200).json('Task has been added');
    } catch (err) {
      console.error(err);
    }
  },
};
