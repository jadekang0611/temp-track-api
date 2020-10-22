const express = require('express');
const router = express.Router();

// IMPORT MY MODEL
const Student = require('../models/Student');

// ROUTES

// GET ALL THE STUDENTS

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;