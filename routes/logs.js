const express = require('express');
const router = express.Router();

// IMPORT THE LOG MODEL
const Log = require('../models/Log');

// ROUTES

// GET ALL LOGS
router.get('/', async (req, res, next) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
