const express = require('express');

const app = express();

const cors = require('cors');

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy();

const mongoose = require('mongoose');

require('dotenv/config');

const bodyParser = require('body-parser');

// Import routes
const studentsRoute = require('./routes/students');
const logsRoute = require('./routes/logs');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/students', studentsRoute);
app.use('/logs', logsRoute);

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (rr) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTIONS,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB!');
  }
);

app.listen(8000);
