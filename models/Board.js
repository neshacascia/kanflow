const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  boards: {
    type: Array,
  },
});

module.exports = mongoose.model('Board', BoardSchema);
