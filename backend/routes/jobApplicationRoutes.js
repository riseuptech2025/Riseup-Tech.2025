const connectDB = require("../config/db");
const JobApplication = require("../models/JobApplication");

module.exports = async (req, res) => {
  try {
    // 1️⃣ Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    // 2️⃣ Connect to MongoDB (safe for serverless)
    await connectDB();

    // 3️⃣ Read JSON body
    const { fullName, email, phone, position, coverLetter, resumeUrl } = req.body;

    // 4️⃣ Validate all required fields
    if (!fullName || !email || !phone || !position || !coverLetter || !resumeUrl) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 5️⃣ Save job application
    const application = await JobApplication.create({
      fullName,
      email,
      phone,
      position,
      coverLetter,
      resumeUrl
    });

    // 6️⃣ Success response
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application
    });

  } catch (error) {
    console.error("❌ API Error:", error.message); // ✅ log real error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
