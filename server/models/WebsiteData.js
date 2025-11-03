const mongoose = require('mongoose');

const websiteDataSchema = new mongoose.Schema({
  company: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    registeredOffice: { type: String, required: true }
  },
  hero: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    badge: { type: String, required: true }
  },
  about: {
    mission: { type: String, required: true },
    vision: { type: String, required: true },
    approach: { type: String, required: true }
  },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WebsiteData', websiteDataSchema);