const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  dateOfBirth: {
    type: Date
  },
  
  // Location Information
  province: {
    type: String,
    required: [true, 'Province is required']
  },
  provinceName: {
    type: String
  },
  district: {
    type: String,
    required: [true, 'District is required']
  },
  municipality: {
    type: String,
    required: [true, 'Municipality is required']
  },
  address: {
    type: String
  },
  
  // Education & Skills
  education: {
    type: String,
    required: [true, 'Education information is required']
  },
  experience: {
    type: String
  },
  skills: {
    type: [String],
    default: []
  },
  otherSkills: {
    type: String
  },
  
  // Membership Type
  membershipType: {
    type: String,
    required: [true, 'Membership type is required'],
    enum: ['intern', 'associate', 'professional', 'other']
  },
  
  // Files
  profilePhoto: {
    type: String // Store file path or URL
  },
  resume: {
    type: String // Store file path or URL
  },
  
  // Motivation & Links
  motivation: {
    type: String,
    required: [true, 'Motivation is required']
  },
  availability: {
    type: String
  },
  linkedin: {
    type: String
  },
  github: {
    type: String
  },
  portfolio: {
    type: String
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  
  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Application', applicationSchema);