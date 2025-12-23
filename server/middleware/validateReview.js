const { body, validationResult } = require('express-validator');

const validateReview = [
  body('app')
    .notEmpty().withMessage('App selection is required')
    .isIn(['School Management System', 'Library Management System', 'Office Management System', 'Other'])
    .withMessage('Invalid app selection'),
  
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  
  body('review')
    .trim()
    .notEmpty().withMessage('Review is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Review must be between 10 and 1000 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }
    next();
  }
];

module.exports = validateReview;