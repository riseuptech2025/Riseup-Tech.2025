const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/riseup_tech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/jobapplications', require('./routes/jobapplications'));
app.use('/api/locations', require('./routes/locations')); 

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Riseup-Tech Backend is running',
    timestamp: new Date().toISOString()
  });
});

// In your backend routes

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 })
    res.json({ success: true, reviews })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all job applications
app.get('/api/jobapplications', async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 })
    res.json({ success: true, applications })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all contact submissions
app.get('/api/contact', async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, submissions })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all membership applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await MembershipApplication.find().sort({ createdAt: -1 })
    res.json({ success: true, applications })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete endpoints
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.delete('/api/jobapplications/:id', async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.delete('/api/contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.delete('/api/applications/:id', async (req, res) => {
  try {
    await MembershipApplication.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Handle 404
// Handle 404 (must be last)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Uploads directory: ${path.join(__dirname, 'uploads')}`);
});