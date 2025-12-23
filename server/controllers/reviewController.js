const Review = require('../models/Review');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      app: req.body.app,
      name: req.body.name,
      email: req.body.email,
      rating: req.body.rating,
      review: req.body.review
    });

    const savedReview = await review.save();
    
    res.status(201).json({
      success: true,
      message: 'Review submitted successfully!',
      data: savedReview
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting review',
      error: error.message
    });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const {
      app,
      rating,
      status = 'approved',
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    const query = { status };
    
    if (app) {
      query.app = app;
    }
    
    if (rating) {
      query.rating = parseInt(rating);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await Review.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Review.countDocuments(query);

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: reviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// @desc    Get review statistics
// @route   GET /api/reviews/stats
// @access  Public
exports.getReviewStats = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $match: { status: 'approved' }
      },
      {
        $group: {
          _id: '$app',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratings: {
            $push: '$rating'
          }
        }
      },
      {
        $project: {
          app: '$_id',
          averageRating: { $round: ['$averageRating', 1] },
          totalReviews: 1,
          ratingDistribution: {
            $map: {
              input: [1, 2, 3, 4, 5],
              as: 'star',
              in: {
                star: '$$star',
                count: {
                  $size: {
                    $filter: {
                      input: '$ratings',
                      as: 'rating',
                      cond: { $eq: ['$$rating', '$$star'] }
                    }
                  }
                }
              }
            }
          }
        }
      },
      {
        $unset: ['_id', 'ratings']
      }
    ]);

    const totalStats = await Review.aggregate([
      {
        $match: { status: 'approved' }
      },
      {
        $group: {
          _id: null,
          overallAverage: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        byApp: stats,
        overall: totalStats[0] || { overallAverage: 0, totalReviews: 0 }
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// @desc    Update review status (for admin)
// @route   PUT /api/reviews/:id/status
// @access  Private
exports.updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isFeatured } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (isFeatured !== undefined) updateFields.isFeatured = isFeatured;

    const review = await Review.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
};

// @desc    Get featured reviews
// @route   GET /api/reviews/featured
// @access  Public
exports.getFeaturedReviews = async (req, res) => {
  try {
    const featuredReviews = await Review.find({
      status: 'approved',
      isFeatured: true
    })
    .sort('-createdAt')
    .limit(5)
    .select('name rating review app createdAt');

    res.status(200).json({
      success: true,
      count: featuredReviews.length,
      data: featuredReviews
    });
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured reviews',
      error: error.message
    });
  }
};