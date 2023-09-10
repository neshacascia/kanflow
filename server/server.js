const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const logger = require('morgan');

require('dotenv').config({ path: './config/.env' });

// passport config
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}.`);
});
