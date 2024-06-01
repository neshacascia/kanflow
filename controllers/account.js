const path = require('path');
const User = require('../models/User');
const { ObjectId } = require('mongodb');

module.exports = {
  updateAccount: async (req, res) => {
    const email = req.body.email != req.user.email ? req.body.email : null;

    try {
      if (email) {
        await User.findOneAndUpdate(
          {
            _id: req.user.id,
          },
          { email: email },
          {
            new: true,
          }
        );
      }
      console.log("User's email has been updated");
      res.status(200).json("User's email has been updated");
    } catch (err) {
      console.error(err);
    }
  },
};
