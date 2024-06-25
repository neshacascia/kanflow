const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/database');
const PORT = process.env.PORT || 3000;

const homeRoutes = require('./routes/home');
const boardRoutes = require('./routes/board');
const accountRoutes = require('./routes/account');

// run NODE_ENV=development node server.js to start in dev
const isDevelopment = process.env.NODE_ENV === 'development';

const cookieSettings = isDevelopment
  ? { SameSite: 'None', Secure: 'false', maxAge: 7 * 24 * 60 * 60 * 1000 }
  : { secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 };

require('dotenv').config({ path: './config/.env' });

// passport config
require('./config/passport')(passport);

app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

isDevelopment &&
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
    cookie: cookieSettings,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', homeRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/account', accountRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}.`);
  });
});
