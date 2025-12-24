// server/routes/applications.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Application = require('../models/Application'); // adjust path if needed

// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,   // 10 MB for files
    fieldSize: 5 * 1024 * 1024    // 5 MB for text fields
  }
});

// Submit new application with file uploads
router.post('/', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('📨 Received application submission:', {
      body: req.body,
      files: req.files ? Object.keys(req.files) : 'No files'
    });

    // Parse skills array from stringified JSON or comma-separated string
    let skills = [];
    if (req.body.skills) {
      try {
        skills = JSON.parse(req.body.skills);
      } catch (error) {
        if (typeof req.body.skills === 'string') {
          skills = req.body.skills.split(',').map(s => s.trim()).filter(s => s);
        }
      }
    }

    // Prepare application data
    const applicationData = {
      fullName: req.body.fullName || '',
      email: req.body.email || '',
      phone: req.body.phone || '',
      dateOfBirth: req.body.dateOfBirth || null,
      province: req.body.province || '',
      provinceName: req.body.provinceName || '',
      district: req.body.district || '',
      municipality: req.body.municipality || '',
      address: req.body.address || '',
      education: req.body.education || '',
      experience: req.body.experience || '',
      skills: skills,
      otherSkills: req.body.otherSkills || '',
      membershipType: req.body.membershipType || '',
      motivation: req.body.motivation || '',
      availability: req.body.availability || '',
      linkedin: req.body.linkedin || '',
      github: req.body.github || '',
      portfolio: req.body.portfolio || '',
      status: 'pending'
    };

    // Attach uploaded files
    if (req.files) {
      if (req.files.profilePhoto) applicationData.profilePhoto = req.files.profilePhoto[0].filename;
      if (req.files.resume) applicationData.resume = req.files.resume[0].filename;
    }

    // Validate required fields
    const requiredFields = [
      'fullName', 'email', 'phone', 'province', 'district',
      'municipality', 'education', 'membershipType', 'motivation'
    ];
    const missingFields = requiredFields.filter(f => !applicationData[f]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Save application
    const application = new Application(applicationData);
    await application.save();

    console.log('✅ Application saved successfully:', { id: application._id, email: application.email });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: application._id,
        fullName: application.fullName,
        email: application.email,
        status: application.status,
        submittedAt: application.submittedAt
      }
    });

  } catch (error) {
    console.error('❌ Error submitting application:', error);

    // Multer errors
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB'
      });
    }

    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    // Duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

    // Fallback server error
    res.status(500).json({
      success: false,
      message: 'Server error while submitting application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
// GET all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});


module.exports = router;
