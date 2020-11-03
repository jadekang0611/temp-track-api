const mongoose = require('mongoose');

// Create a schema
const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  address: {
    dong: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
  },
  group: {
    type: Number,
    required: false,
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
    required: false,
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
