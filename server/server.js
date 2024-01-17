const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const homeRoutes = require('./routes/home');
const boardRoutes = require('./routes/board');

require('dotenv').config({ path: './config/.env' });

// passport config
require('./config/passport')(passport);

app.use(
  cors({
    origin: 'https://nc-kanflow.vercel.app/',
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/api', homeRoutes);
app.use('/api/board', boardRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}.`);
  });
});
