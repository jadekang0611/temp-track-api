const mongoose = require('mongoose');

// Create a schema
const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    dong: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  group: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  parent: {
    parent_name: {
      type: String,
      required: true,
    },
    parent_number: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('Students', StudentSchema);
