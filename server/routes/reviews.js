const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create new review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    
    res.status(201).json({ 
      message: 'Review submitted successfully', 
      data: review 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review', error: error.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
});

module.exports = router;