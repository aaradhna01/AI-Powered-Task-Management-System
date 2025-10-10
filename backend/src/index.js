const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const taskRoutes = require("./routes/tasks");
const aiRoutes = require("./routes/ai");
const taskAttachmentRoutes = require("./routes/taskAttachments");
const userSessionRoutes = require("./routes/userSessions");
const pdfChatRoutes = require("./routes/pdfChat");
const resumeRoutes = require("./routes/resume");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

// ✅ FINAL CORS setup (complete)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://aaradhna01.github.io",
      "https://aaradhna01.github.io/AI-Powered-Task-Management-System",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/attachments", taskAttachmentRoutes);
app.use("/api/sessions", userSessionRoutes);
app.use("/api/pdf", pdfChatRoutes);
app.use("/api/resume", resumeRoutes);

// ✅ Error handler
app.use(errorHandler);

// ✅ DB sync
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced successfully");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
