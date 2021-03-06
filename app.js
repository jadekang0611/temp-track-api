const express = require('express');

const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv/config');

const bodyParser = require('body-parser');

// Import routes
const studentsRoute = require('./routes/students');
const logsRoute = require('./routes/logs');
const authRoute = require('./routes/auth');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Route Middlewares
app.use('/students', studentsRoute);
app.use('/logs', logsRoute);
app.use('/auth/user', authRoute);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My app is running on port ${PORT}.`);
});
