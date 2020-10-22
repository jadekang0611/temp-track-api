const express = require('express');

const app = express();

const cors = require('cors');

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

app.listen(3000);
