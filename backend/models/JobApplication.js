const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    coverLetter: { type: String, required: true },
    resumeUrl: { type: String, required: true } // store Cloudinary URL
  },
  { timestamps: true }
);

// ✅ This prevents model overwrite errors in serverless
module.exports = mongoose.models.JobApplication || mongoose.model("JobApplication", jobApplicationSchema);
