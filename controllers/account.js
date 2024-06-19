const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/User');

module.exports = {
  updateAccount: async (req, res) => {
    const user = await User.findById(req.user.id);
    const email = req.body.email != req.user.email ? req.body.email : null;

    try {
      if (email) {
        if (req.user.id === process.env.DEMO_USER_ID) {
          return res.status(403).json({
            msg: 'Email changes are not permitted for demo accounts. ',
          });
        }

        const existingUser = await User.findOne({
          email: req.body.email,
        }).exec();

        if (existingUser) {
          return res.status(409).json({
            msg: 'An account with that email address already exists.',
          });
        }

        await User.findOneAndUpdate(
          {
            _id: req.user.id,
          },
          { email: email },
          {
            new: true,
          }
        );
        console.log("User's email has been updated");
      }
      if (req.body.currentPassword) {
        if (req.user.id === process.env.DEMO_USER_ID) {
          return res.status(401).json({
            msg: 'Password changes are not permitted for demo accounts. ',
          });
        }
        const isMatch = await bcrypt.compare(
          req.body.currentPassword,
          user.password
        );

        if (!isMatch) {
          console.log('Invalid current password');
          return res.status(401).json({ msg: 'Invalid current password' });
        } else {
          if (req.body.newPassword) {
            bcrypt.genSalt(10, async (err, salt) => {
              try {
                const hash = await bcrypt.hash(req.body.newPassword, salt);
                newPassword = hash;

                await User.findOneAndUpdate(
                  {
                    _id: req.user.id,
                  },
                  {
                    password: newPassword,
                  },
                  {
                    new: true,
                  }
                );
                console.log("User's password has been updated");
              } catch (err) {
                console.error(err);
              }
            });
          }
        }
      }
      res.status(200).json({ msg: "User's account has been updated" });
    } catch (err) {
      console.error(err);
    }
  },
};
