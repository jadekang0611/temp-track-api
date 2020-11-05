const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

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
    //<------- Instead of Sending all object fields for security reason, just send the auto created user_id------->//
    res.send({ user: user._id });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// LOGIN
router.post('/signin', async (req, res, next) => {
  // VALIDATE THE DATA BEFORE I ACCEPT A USER
  const { error } = loginValidation(req.body);
  if (error) return res.send(400).send(error.details[0].message);
  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('Email is not found.');
  //Checking if the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password.');

  // CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
  console.log(user + token);
});

// VALIDATING TOKEN
// router.post('/token', async (req, res) => {
//   try {
//     const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
//     console.log(verified);
//     res.status(200).send(true);
//   } catch (e) {
//     res.status(200).send(false);
//   }
// });

module.exports = router;
