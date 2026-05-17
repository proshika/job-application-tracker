const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Wishlist', 'Applied', 'Interviewing', 'Offered', 'Rejected'],
    default: 'Applied'
  },
  salary: {
    type: Number,
    optional: true
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
