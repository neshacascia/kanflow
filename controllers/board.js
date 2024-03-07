const path = require('path');
const Board = require('../models/Board');
const Task = require('../models/Task');
const { ObjectId } = require('mongodb');

module.exports = {
  getBoards: async (req, res) => {
    try {
      const userId = req.user && req.user.id;

      if (!userId) {
        console.log('User is not logged in');
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const boards = await Board.find({ userId: req.user.id }).lean();
      res.status(200).json({
        boards: boards.length > 0 ? boards[0].boards : [],
        user: req.user.id,
      });
    } catch (err) {
      console.error(err);
    }
  },
  getBoard: async (req, res) => {
    try {
      const userBoards = await Board.findOne({
        userId: req.user.id,
      });

      if (!userBoards) {
        return res.status(404).json({ error: 'Board not found' });
      }

      const board = userBoards.boards.find(board =>
        board._id.equals(new ObjectId(req.params.id))
      );

      res.status(200).json({ board });
    } catch (err) {
      console.error(err);
      return res.status(404).json({ error: 'Board not found' });
    }
  },
  createBoard: async (req, res) => {
    try {
      console.log(req.body);
      const { boardData } = req.body;

      const newBoard = await Board.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        {
          $push: {
            boards: {
              _id: new ObjectId(),
              name: boardData.name,
              columns: boardData.columns.map(column => ({
                ...column,
                tasks: [],
              })),
            },
          },
        },
        { upsert: true, new: true }
      );
      console.log('Board has been added');
      res.status(200).json({ boardId: newBoard._id });
    } catch (err) {
      console.error(err);
    }
  },
  editBoard: async (req, res) => {
    try {
      await Board.updateOne(
        { _id: req.body.boardData.id },
        {
          $set: {
            name: req.body.boardData.name,
            columns: req.body.boardData.columns,
          },
        }
      );
      console.log('Board has been updated');
      res.status(200).json('Board has been updated');
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
        order: req.body.taskData.order,
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
  delete: async (req, res) => {
    console.log(req.body);
    try {
      if (req.body.modal === 'deleteTask') {
        await Task.deleteOne({ _id: req.body.data });
        console.log('Task has been deleted');
        res.status(200).json('Task has been deleted');
      } else {
        await Board.deleteOne({ _id: req.body.data });
        console.log('Board has been deleted');
        res.status(200).json('Board has been deleted');
      }
    } catch (err) {
      console.error(err);
    }
  },
};
