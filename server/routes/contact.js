// File: routes/contactRoutes.js - API routes
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { transporter, emailTemplates } = require('../config/emailConfig');

// Validation middleware[citation:3]
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters')
    .escape(),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
    .escape(),
  
  body('interest')
    .optional()
    .isIn([
      'General Inquiry',
      'Product Development',
      'Partnership Opportunity',
      'Career Opportunities',
      'Technical Support',
      'Investment Inquiry'
    ])
];

// Submit contact form
router.post('/submit', validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array(),
        message: 'Validation failed'
      });
    }

    const { name, email, subject, message, interest } = req.body;
    
    // Create new contact document[citation:8]
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      interest: interest || 'General Inquiry',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Save to database
    const savedContact = await newContact.save();

    // Send notification email to admin
    try {
      await transporter.sendMail(emailTemplates.notification(savedContact));
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails
    }

    // Send auto-reply to user
    try {
      await transporter.sendMail(emailTemplates.autoReply(savedContact));
    } catch (autoReplyError) {
      console.error('Failed to send auto-reply:', autoReplyError);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: savedContact._id,
        timestamp: savedContact.timestamp
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all contacts (Admin only - add authentication in production)
router.get('/admin', async (req, res) => {
  try {
    // Add authentication check in production
    const { page = 1, limit = 20, status } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const contacts = await Contact.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// Update contact status (Admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { 
        status,
        lastUpdated: Date.now()
      },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: updatedContact
    });
    
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

module.exports = router;