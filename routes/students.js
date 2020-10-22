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

// GET A SPECIFIC STUDENT by id
router.get('/:studentId', async (req, res, next) => {
  const query = { _id: req.params.studentId };
  try {
    const student = await Student.findOne(query);
    res.status(200).json(student);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// CREATE A STUDENT
router.post('/', async (req, res, next) => {
  const student = new Student({
    name: req.body.name,
    dob: req.body.dob,
    address: req.body.address,
    group: req.body.group,
    grade: req.body.grade,
    school: req.body.school,
    phone_number: req.body.phone_number,
    parent: req.body.parent,
  });
  try {
    const savedStudent = await student.save();
    res.status(200).json(savedStudent);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// DELETE A STUDENT
router.delete('/:studentId', async (req, res, next) => {
  try {
    const removedStudent = await Student.remove({
      _id: req.params.studentId,
    });
    res.status(200).json(removedStudent);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// UPDATE A STUDENT
router.patch('/:studentId', async (req, res, next) => {
  const query = { _id: req.params.studentId };

  let obj = {};
  const grade = req.body.grade;
  const phone_number = req.body.phone_number;
  const school = req.body.school;
  const address = req.body.address;

  grade ? (obj.grade = grade) : '';
  phone_number ? (obj.phone_number = phone_number) : '';
  school ? (obj.school = school) : '';
  address ? (obj.address = address) : '';

  const set = {
    $set: obj,
  };
  try {
    const updatedStudent = await Student.updateOne(query, set);
    res.status(200).json(updatedStudent);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
