const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  source: { type: String, default: 'website' }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);