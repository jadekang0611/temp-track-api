const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE A NEW USER
router.post('/register', async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
