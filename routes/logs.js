const express = require('express');
const router = express.Router();
const dayJS = require('dayjs');
const verify = require('./verifyToken');

// verify will be used as a middleware to routes to make them protected routes.

// IMPORT THE LOG MODEL
const Log = require('../models/Log');

// ROUTES

// GET ALL LOGS
router.get('/', verify, async (req, res, next) => {
  console.log('test');
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// GET A SPECIFIC Students' logs by StudentID
router.get('/:studentId', verify, async (req, res, next) => {
  const query = { student_id: req.params.studentId };
  try {
    // const logGroup = await Log.find(query);
    // res.status(200).json(logGroup);
    const logGroup = await Log.aggregate([
      { $match: query },
      { $sort: { date_time: 1 } },
    ]);
    res.status(200).json(logGroup);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// GET LOGS BY DATE RANGE
router.post('/date', verify, async (req, res, next) => {
  const firstDate = new Date(req.body.firstDate);
  let secondDate = new Date(req.body.secondDate);

  try {
    if (secondDate.toString() === 'Invalid Date') {
      secondDate = new Date();
    } else {
      secondDate;
    }
    const logGroup2 = await Log.aggregate([
      {
        $match: {
          date_time: {
            $lte: secondDate,
            $gte: firstDate,
          },
        },
      },
      { $sort: { name: 1 } },
    ]);
    res.status(200).json(logGroup2);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// CREATE A NEW LOG
router.post('/', verify, async (req, res, next) => {
  const log = new Log({
    name: req.body.name,
    temperature: req.body.temperature,
    high_fever: req.body.high_fever,
    date_time: req.body.date_time,
    student_id: req.body.student_id,
  });
  try {
    const savedLog = await log.save();
    res.status(200).json(savedLog);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
