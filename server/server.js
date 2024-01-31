const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('morgan');
const connectDB = require('./config/database');
const homeRoutes = require('./routes/home');
const boardRoutes = require('./routes/board');
const { ensureAuth } = require('./middleware/auth');
const staticPath = path.join(__dirname, '../client/dist');

require('dotenv').config({ path: './config/.env' });

// passport config
require('./config/passport')(passport);

app.use(
  cors({
    origin: 'https://kanflow.onrender.com',
    credentials: true,
  })
);

app.set('trust proxy', 1);
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
    store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'None',
    },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send("Hello, welcome to Kanflow's server!");
});

app.use('/api', homeRoutes);
app.use('/api/board', ensureAuth, boardRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.use((req, res, next) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}.`);
  });
});
