const mongoose = require('mongoose');

// Create a schema
const LogSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  date_time: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: false,
  },
  student_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Logs', LogSchema);
