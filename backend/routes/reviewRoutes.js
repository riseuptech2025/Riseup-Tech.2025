const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

/* ---------- Submit Review ---------- */
router.post("/", async (req, res) => {
  try {
    const { app, name, email, review, rating } = req.body;

    // Validation
    if (!app || !name || !email || !review || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields including rating are required"
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const newReview = await Review.create({
      app,
      name,
      email,
      review,
      rating
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: newReview
    });
  } catch (error) {
    console.error("❌ Review Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

module.exports = router;
