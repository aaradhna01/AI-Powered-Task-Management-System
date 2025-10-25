// // index.js
// const express = require("express");
// const cors = require("cors");
// const sequelize = require("./config/db");
// const dotenv = require("dotenv");

// const authRoutes = require("./routes/auth");
// const dashboardRoutes = require("./routes/dashboard");
// const taskRoutes = require("./routes/tasks");
// const aiRoutes = require("./routes/ai");
// const taskAttachmentRoutes = require("./routes/taskAttachments");
// const userSessionRoutes = require("./routes/userSessions");
// const pdfChatRoutes = require("./routes/pdfChat");
// const resumeRoutes = require("./routes/resume");

// const errorHandler = require("./middleware/errorHandler");

// dotenv.config();
// const app = express();

// // ✅ Localhost ke liye CORS setup
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use(express.json());

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/attachments", taskAttachmentRoutes);
// app.use("/api/sessions", userSessionRoutes);
// app.use("/api/pdf", pdfChatRoutes);
// app.use("/api/resume", resumeRoutes);

// // ✅ Error handling middleware
// app.use(errorHandler);

// // ✅ DB Sync
// sequelize.sync({ alter: true }).then(() => {
//   console.log("✅ Database synced successfully");
// });

// // ✅ Start server (Local)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// ✅ index.js (for Vercel deployment)
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const dotenv = require("dotenv");

// Import all routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const taskRoutes = require("./routes/tasks");
const aiRoutes = require("./routes/ai");
const taskAttachmentRoutes = require("./routes/taskAttachments");
const userSessionRoutes = require("./routes/userSessions");
const pdfChatRoutes = require("./routes/pdfChat");
const resumeRoutes = require("./routes/resume");
const errorHandler = require("./middleware/errorHandler");

// Load .env file
dotenv.config();

// Initialize Express app
const app = express();

// ✅ Allow JSON body
app.use(express.json());

// ✅ Proper CORS setup for both local + deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend
      "https://aaradhna01.github.io", // Your GitHub Pages domain
      "https://aaradhna01.github.io/AI-Powered-Task-Management-System", // GitHub Pages subpath
    ],
    credentials: true,
  })
);

// ✅ All API routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/attachments", taskAttachmentRoutes);
app.use("/api/sessions", userSessionRoutes);
app.use("/api/pdf", pdfChatRoutes);
app.use("/api/resume", resumeRoutes);

// ✅ Error handling middleware
app.use(errorHandler);

// ✅ Database connection + sync
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Tables synced successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

// ✅ Export app (important for Vercel)
module.exports = app;
