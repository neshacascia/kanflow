const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/database');
const homeRoutes = require('./routes/home');
const boardRoutes = require('./routes/board');

require('dotenv').config({ path: './config/.env' });

// passport config
require('./config/passport')(passport);

app.set('trust proxy', 1);
app.use(express.static(path.join('client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', homeRoutes);
app.use('/api/board', boardRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join('client/dist/index.html', { root: '.' }));
});

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`The server is running on port ${process.env.PORT}.`);
  });
});
