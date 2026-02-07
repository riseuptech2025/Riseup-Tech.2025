const express = require("express");
const ContactMessage = require("../models/ContactMessage");

const router = express.Router();

/* ---------- Submit Contact Form ---------- */
router.post("/submit", async (req, res) => {
  try {
    const { name, email, subject, message, interest } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      interest
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage
    });
  } catch (error) {
    console.error("❌ Contact Form Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

module.exports = router;
