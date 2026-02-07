require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------- DB ---------- */
connectDB();

/* ---------- Routes ---------- */
app.use("/api/jobapplications", require("./routes/jobApplicationRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

/* ---------- Export for Vercel ---------- */
module.exports = app;

/* ---------- Local Server ---------- */
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}
