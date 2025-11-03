const express = require('express');
const router = express.Router();
const WebsiteData = require('../models/WebsiteData');

// Get website data
router.get('/', async (req, res) => {
  try {
    let websiteData = await WebsiteData.findOne();
    
    if (!websiteData) {
      // Create default data if none exists
      websiteData = await WebsiteData.create({
        company: {
          name: 'Riseup-Tech',
          email: 'riseuptech2025@gmail.com',
          phone: '+977-9827399860',
          address: 'Basundhara-7, Kathmandu, Nepal',
          registeredOffice: 'Tilathi-Koiladi Rural Municipality-2, Launiya, Saptari, Nepal'
        },
        hero: {
          title: "Let's Rise Together with Technology",
          subtitle: "Building the future of AI, connection, and innovation. We create intelligent platforms that empower people and transform industries worldwide.",
          badge: "Building the Future of AI & Innovation"
        },
        about: {
          mission: "To rise up technology and innovation in Nepal by building smart, user-friendly digital solutions that empower individuals.",
          vision: "Create a fully interconnected ecosystem of apps and AI-driven platforms for seamless digital experiences.",
          approach: "We don't sell technology - we create it for people, enabling growth, learning, and innovation."
        },
        social: {
          facebook: 'https://www.facebook.com/riseup.tech.2082',
          twitter: 'https://x.com/csit_ramanand',
          instagram: 'https://www.instagram.com/riseup__tech/',
          linkedin: 'https://www.linkedin.com/company/riseup-tech-2025'
        }
      });
    }
    
    res.status(200).json(websiteData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching website data', error: error.message });
  }
});

// Update website data
router.put('/', async (req, res) => {
  try {
    const updates = req.body;
    let websiteData = await WebsiteData.findOne();
    
    if (!websiteData) {
      websiteData = new WebsiteData(updates);
    } else {
      Object.keys(updates).forEach(key => {
        websiteData[key] = { ...websiteData[key], ...updates[key] };
      });
    }
    
    await websiteData.save();
    res.status(200).json({ message: 'Website data updated successfully', data: websiteData });
  } catch (error) {
    res.status(500).json({ message: 'Error updating website data', error: error.message });
  }
});

module.exports = router;