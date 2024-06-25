const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/User');
const Board = require('../models/Board');
const cloudinary = require('../middleware/cloudinary');
const { ObjectId } = require('mongodb');

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
  updateAvatar: async (req, res) => {
    const userId = req.user.id;

    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      const optimizedUrl = cloudinary.url(result.public_id, {
        fetch_format: 'auto',
        quality: 'auto',
        width: 900,
        height: 900,
        crop: 'limit',
      });

      await User.findByIdAndUpdate(userId, {
        avatar: optimizedUrl,
        cloudinaryId: result.public_id,
      });

      return res.status(200).json({
        message: 'Avatar photo updated!',
        avatarLink: result.secure_url,
      });
    } catch (err) {
      console.error(err);
    }
  },
  deleteAccount: async (req, res) => {
    const userId = req.user.id;
    try {
      await User.findByIdAndDelete(userId);
      await Board.deleteMany({ userId: userId });

      console.log(
        'Account and associated boards have been deleted successfully.'
      );
      res.status(200).json({
        message:
          'Account and associated boards have been deleted successfully.',
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: 'An error occurred while deleting the account.' });
    }
  },
};
