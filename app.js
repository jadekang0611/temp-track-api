const express = require('express');

const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

// Import routes
const studentsRoute = require('./routes/students');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/students', studentsRoute);

app.get('/', (req, res, next) => {
  res.send('We are home');
});

app.listen(3000);
