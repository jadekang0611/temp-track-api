const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerValidation } = require('../validation');
const bcrypt = require('bcryptjs');

// CREATE A NEW USER
router.post('/register', async (req, res, next) => {
  // VALIDATE THE DATA BEFORE I ACCEPT USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF THE USER IS ALREADY IN THE DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists.');

  //HASH PASSWORDS
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE A NEW USER
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.post('/login', (req, res, next) => {});

module.exports = router;
