const path = require('path');
const Board = require('../models/Board');

module.exports = {
  getIndex: (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
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
};
