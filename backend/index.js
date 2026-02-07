// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db"); // MongoDB connection

const app = express();

/* ---------- Middlewares ---------- */
// Enable CORS for frontend domain and local dev
app.use(
  cors({
    origin: [
      "https://www.riseup-tech.com.np", // production frontend
      "http://localhost:5173" // Vite dev server
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

// Body parser
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------- Connect to DB ---------- */
connectDB();

/* ---------- Routes ---------- */
app.use("/api/jobapplications", require("./routes/jobApplicationRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

/* ---------- Root Route ---------- */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ---------- Export for Vercel ---------- */
module.exports = app;

/* ---------- Local Development Server ---------- */
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
