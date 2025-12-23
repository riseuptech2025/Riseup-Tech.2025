// routes/jobapplications.js
const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');
const upload = require('../middleware/upload');
const fs = require('fs');

// Submit job application
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const duplicate = await JobApplication.findOne({
      email: req.body.email,
      position: req.body.position,
      appliedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (duplicate && req.file) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this position recently.'
      });
    }

    const applicationData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      coverLetter: req.body.coverLetter,
      resume: req.file ? {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size
      } : null
    };

    const application = await JobApplication.create(applicationData);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: { id: application._id, appliedAt: application.appliedAt }
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: 'Failed to submit application', error: error.message });
  }
});

module.exports = router;
