const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/board');
  }
  res.redirect('/login');
};

exports.postLogin = (req, res, next) => {
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  if (req.body.email === process.env.DEMO_USER_EMAIL) {
    req.body.password = process.env.DEMO_USER_PASSWORD;
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ msg: 'Invalid Email or Password. Please Try Again' });
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      if (user.email === process.env.DEMO_USER_EMAIL) {
        return res
          .status(200)
          .json({ msg: 'Success! You are now logged in as a demo user.' });
      }

      return res.status(200).json({ msg: 'Success! You are logged in.' });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) {
      console.log('Error during logout:', err);
      return res.redirect('/');
    }

    req.session.destroy(err => {
      if (err) {
        console.log(
          'Error : Failed to destroy the session during logout.',
          err
        );
        return res.redirect('/');
      }

      req.user = null;
      return res.status(200).json({ message: 'Logout successful' });
    });
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/board');
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }],
    }).exec();

    if (existingUser) {
      return res.status(409).json({
        msg: 'Account with that email address already exists.',
      });
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ msg: 'Success! You are logged in.' });
    });
  } catch (err) {
    return next(err);
  }
};
