// File: utils/validation.js - Additional validation utilities
const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const sanitizeInput = (input) => {
  return validator.escape(validator.trim(input));
};

const validatePhone = (phone) => {
  // Basic phone validation - adjust for Nepali numbers
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

module.exports = {
  validateEmail,
  sanitizeInput,
  validatePhone
};