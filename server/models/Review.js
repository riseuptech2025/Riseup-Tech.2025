const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  app: {
    type: String,
    required: [true, 'Please select an app'],
    enum: [
      'School Management System',
      'Library Management System',
      'Office Management System',
      'Other'
    ]
  },
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  review: {
    type: String,
    required: [true, 'Please enter your review'],
    trim: true,
    minlength: [10, 'Review must be at least 10 characters'],
    maxlength: [1000, 'Review cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;