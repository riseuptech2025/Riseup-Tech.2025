// models/JobApplication.js
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  coverLetter: { type: String },
  resume: {
    fileName: String,
    filePath: String,
    fileType: String,
    fileSize: Number
  },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
