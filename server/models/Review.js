const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  app: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  status: { type: String, default: 'pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);