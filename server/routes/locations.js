const express = require('express');
const router = express.Router();

// Nepal data (same as frontend)
const nepalData = {
  "1": { 
    "Taplejung": ["Phungling Municipality", "Sidingba Rural Municipality", "Meringden Rural Municipality", "Maiwakhola Rural Municipality", "Phaktanglung Rural Municipality", "Sirijangha Rural Municipality", "Mikwakhola Rural Municipality", "Aathrai Tribeni Rural Municipality", "Pathivara Yangwarak Rural Municipality"],
    "Sankhuwasabha": ["Khandbari Municipality", "Chainpur Municipality", "Dharmadevi Municipality", "Panchakhapan Municipality", "Madi Municipality", "Makalu Rural Municipality", "Chichila Rural Municipality", "Silichong Rural Municipality", "Bhotkhola Rural Municipality", "Sabhapokhari Rural Municipality"],
    // ... include all your districts and municipalities
  },
  // ... include all 7 provinces
};

// Province names
const provinceNames = {
  '1': 'Koshi Province',
  '2': 'Madhesh Province',
  '3': 'Bagmati Province',
  '4': 'Gandaki Province',
  '5': 'Lumbini Province',
  '6': 'Karnali Province',
  '7': 'Sudurpashchim Province'
};

// Get all provinces
router.get('/provinces', (req, res) => {
  const provinces = Object.keys(provinceNames).map(id => ({
    id,
    name: provinceNames[id]
  }));
  
  res.json({
    success: true,
    data: provinces
  });
});

// Get districts by province
router.get('/districts/:provinceId', (req, res) => {
  const { provinceId } = req.params;
  
  if (!nepalData[provinceId]) {
    return res.status(404).json({
      success: false,
      message: 'Province not found'
    });
  }
  
  const districts = Object.keys(nepalData[provinceId]).map(districtName => ({
    name: districtName
  }));
  
  res.json({
    success: true,
    data: districts
  });
});

// Get municipalities by province and district
router.get('/municipalities/:provinceId/:districtName', (req, res) => {
  const { provinceId, districtName } = req.params;
  
  if (!nepalData[provinceId] || !nepalData[provinceId][districtName]) {
    return res.status(404).json({
      success: false,
      message: 'Province or district not found'
    });
  }
  
  const municipalities = nepalData[provinceId][districtName].map(municipalityName => ({
    name: municipalityName
  }));
  
  res.json({
    success: true,
    data: municipalities
  });
});

// Get all locations data
router.get('/all', (req, res) => {
  res.json({
    success: true,
    data: {
      provinces: provinceNames,
      locations: nepalData
    }
  });
});

module.exports = router;