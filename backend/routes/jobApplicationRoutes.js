const connectDB = require("../config/db");
const JobApplication = require("../models/JobApplication");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const {
      fullName,
      email,
      phone,
      position,
      coverLetter,
      resumeUrl
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !position ||
      !coverLetter ||
      !resumeUrl
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const application = await JobApplication.create({
      fullName,
      email,
      phone,
      position,
      coverLetter,
      resumeUrl
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application
    });

  } catch (error) {
    console.error("❌ API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
