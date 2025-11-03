const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  coverLetter: { type: String, required: true },
  resume: {
    filename: String,
    originalName: String,
    path: String
  },
  status: { type: String, default: 'pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);