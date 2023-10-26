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
  getBoard: async (req, res) => {
    try {
      const board = await Board.find({ _id: req.params.id });
      const tasks = await Task.find({ boardId: req.params.id });
      res.status(200).json({ board, tasks });
    } catch (err) {
      console.error(err);
    }
  },
  createBoard: async (req, res) => {
    try {
      const newBoard = await Board.create({
        name: req.body.boardName,
        columns: req.body.columnName,
        userId: req.user.id,
      });
      console.log('Board has been added');
      res.redirect(`/board/${newBoard._id}`);
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
  editTask: async (req, res) => {
    console.log(req.body.taskData);
    try {
      await Task.updateOne(
        { _id: req.body.taskData.taskId },
        {
          $set: {
            title: req.body.taskData.title,
            description: req.body.taskData.description,
            subtasks: req.body.taskData.subtasks,
            status: req.body.taskData.status,
          },
        }
      );
      console.log('Task has been updated');
      res.status(200).json('Task has been updated');
    } catch (err) {
      console.error(err);
    }
  },
  updateStatus: async (req, res) => {
    try {
      await Task.updateOne(
        { _id: req.body.taskId },
        { $set: { status: req.body.status } }
      );
      console.log("Task's status has been updated");
      res.status(200).json("Task's status has been updated");
    } catch (err) {
      console.error(err);
    }
  },
  setCompletionStatus: async (req, res) => {
    try {
      if (req.body.completed) {
        await Task.updateOne(
          { _id: req.body.taskId, 'subtasks.id': req.body.subtaskId },
          { $set: { 'subtasks.$.completed': false } }
        );
        console.log('Subtask has been marked incompleted');
        res
          .status(200)
          .json("Subtask's completion status has been marked incompleted");
      } else {
        await Task.updateOne(
          { _id: req.body.taskId, 'subtasks.id': req.body.subtaskId },
          { $set: { 'subtasks.$.completed': true } }
        );
        console.log('Subtask has been marked completed');
        res
          .status(200)
          .json("Subtask's completion status has been marked completed");
      }
    } catch (err) {
      console.error(err);
    }
  },
};
