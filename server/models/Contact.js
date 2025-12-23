// File: models/Contact.js - Database schema
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [5, 'Subject must be at least 5 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters']
  },
  interest: {
    type: String,
    enum: [
      'General Inquiry',
      'Product Development', 
      'Partnership Opportunity',
      'Career Opportunities',
      'Technical Support',
      'Investment Inquiry'
    ],
    default: 'General Inquiry'
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied', 'archived'],
    default: 'pending'
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Indexes for better query performance
ContactSchema.index({ email: 1, timestamp: -1 });
ContactSchema.index({ status: 1, timestamp: -1 });

module.exports = mongoose.model('Contact', ContactSchema);