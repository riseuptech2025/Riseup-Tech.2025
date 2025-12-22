const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');

// Create new job application
router.post('/', async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    await application.save();
    
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      data: application 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

module.exports = router;