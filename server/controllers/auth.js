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
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: 'Password cannot be blank.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/login');
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      if (user.userName === 'demo_user') {
        return res.redirect('/api/board');
      }

      req.flash('success', { msg: 'Success! You are logged in.' });
      return res.redirect(req.session.returnTo || '/board');
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
    const validationErrors = [];

    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: 'Please enter a valid email address.' });

    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: 'Password must be at least 8 characters long',
      });

    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: 'Passwords do not match' });

    if (validationErrors.length) {
      req.flash('errors', validationErrors);
      return res.redirect('../signup');
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    const existingUser = await User.findOneAndReplace({
      $or: [{ email: req.body.email }],
    }).exec();

    if (existingUser) {
      req.flash('errors', {
        msg: 'Account with that email address or username already exists.',
      });
      return res.redirect('../signup');
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
      res.redirect('/board');
    });
  } catch (err) {
    return next(err);
  }
};

exports.getUser = (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user.userName });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
