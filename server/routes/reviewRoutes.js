const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const validateReview = require('../middleware/validateReview');

// Public routes
router.post('/', validateReview, reviewController.createReview);
router.get('/', reviewController.getReviews);
router.get('/stats', reviewController.getReviewStats);
router.get('/featured', reviewController.getFeaturedReviews);

// Admin routes (protected - add authentication middleware later)
router.put('/:id/status', reviewController.updateReviewStatus);

module.exports = router;