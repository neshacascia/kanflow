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
      return res.status(500).json({ error: 'Internal Server Error' });
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
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createBoard: async (req, res) => {
    try {
      const { boardData } = req.body;

      const userBoards = await Board.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        {
          $push: {
            boards: {
              _id: new ObjectId(),
              name: boardData.name,
              columns: boardData.columns.map(column => column),
            },
          },
        },
        { upsert: true, new: true }
      );
      console.log('Board has been added');
      res
        .status(200)
        .json({ boardId: userBoards.boards[userBoards.boards.length - 1]._id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  editBoard: async (req, res) => {
    try {
      const { boardData } = req.body;

      const updateObject = {
        $set: {
          [`boards.${boardData.boardIndex}.name`]: boardData.name,
          [`boards.${boardData.boardIndex}.columns`]: boardData.columns,
        },
      };

      await Board.findOneAndUpdate({ userId: req.user.id }, updateObject, {
        new: true,
      });
      console.log('Board has been updated');
      res.status(200).json('Board has been updated');
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  addTask: async (req, res) => {
    try {
      const { taskData } = req.body;

      const taskObject = {
        $push: {
          [`boards.${taskData.boardIndex}.tasks`]: {
            _id: new ObjectId(),
            title: taskData.title,
            description: taskData.description,
            subtasks: taskData.subtasks,
            status: taskData.status,
          },
        },
      };

      await Board.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        taskObject,
        {
          new: true,
        }
      );
      console.log('Task has been added');
      res.status(200).json('Task has been added');
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  editTask: async (req, res) => {
    try {
      const { taskData } = req.body;

      const taskObject = {
        $set: {
          [`boards.${taskData.boardIndex}.tasks.${taskData.taskIndex}`]: {
            _id: taskData._id,
            title: taskData.title,
            description: taskData.description,
            subtasks: taskData.subtasks,
            status: taskData.status,
          },
        },
      };

      await Board.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        taskObject,
        {
          new: true,
        }
      );

      console.log('Task has been updated');
      res.status(200).json('Task has been updated');
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { taskData } = req.body;

      const taskObject = {
        $set: {
          [`boards.${taskData.boardIndex}.tasks.${taskData.taskIndex}.status`]:
            taskData.status,
        },
      };

      await Board.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        taskObject,
        {
          new: true,
        }
      );
      console.log("Task's status has been updated");
      res.status(200).json("Task's status has been updated");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  setCompletionStatus: async (req, res) => {
    try {
      const { taskData } = req.body;

      const updateObject = {
        $set: {
          [`boards.${taskData.boardIndex}.tasks.${taskData.taskIndex}.subtasks.${taskData.subtaskId}.completed`]:
            !taskData.completed,
        },
      };

      await Board.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        updateObject,
        {
          new: true,
        }
      );

      if (taskData.completed) {
        console.log('Subtask has been marked incompleted');
        res
          .status(200)
          .json("Subtask's completion status has been marked incompleted");
      } else {
        console.log('Subtask has been marked completed');
        res
          .status(200)
          .json("Subtask's completion status has been marked completed");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  delete: async (req, res) => {
    try {
      const { boardIndex, modal, data } = req.body;
      if (modal === 'deleteTask') {
        await Board.updateOne(
          {
            userId: req.user.id,
          },
          {
            $unset: { [`boards.${boardIndex}.tasks.${data}`]: 1 },
          }
        );

        await Board.updateOne(
          {
            userId: req.user.id,
          },
          {
            $pull: {
              [`boards.${boardIndex}.tasks`]: null,
            },
          }
        );

        console.log('Task has been deleted');
        res.status(200).json('Task has been deleted');
      } else {
        await Board.updateOne(
          {
            userId: req.user.id,
          },
          {
            $unset: {
              [`boards.${boardIndex}`]: 1,
            },
          }
        );

        await Board.updateOne(
          {
            userId: req.user.id,
          },
          {
            $pull: {
              boards: null,
            },
          }
        );
        console.log('Board has been deleted');
        res.status(200).json('Board has been deleted');
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
