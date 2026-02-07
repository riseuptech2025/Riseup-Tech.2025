const express = require("express");
const multer = require("multer");
const path = require("path");
const JobApplication = require("../models/JobApplication");

const router = express.Router();

/* ---------- Multer Config ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|doc|docx/;
    const ext = allowed.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (ext) cb(null, true);
    else cb(new Error("Only PDF, DOC, DOCX files allowed"));
  }
});

/* ---------- Apply Job (SAFE HANDLER) ---------- */
router.post("/apply", (req, res) => {
  upload.single("resume")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    try {
      const { fullName, email, phone, position, coverLetter } = req.body;

      if (!fullName || !email || !phone || !position || !coverLetter) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Resume is required"
        });
      }

      const application = await JobApplication.create({
        fullName,
        email,
        phone,
        position,
        coverLetter,
        resume: req.file.filename
      });

      return res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        data: application
      });
    } catch (error) {
      console.error("❌ Server Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });
});

module.exports = router;
