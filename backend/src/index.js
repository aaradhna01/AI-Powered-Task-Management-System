const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const taskRoutes = require("./routes/tasks");
const aiRoutes = require("./routes/ai");
const taskAttachmentRoutes = require("./routes/taskAttachments");
const userSessionRoutes = require("./routes/userSessions");
const pdfChatRoutes = require("./routes/pdfChat");
const resumeRoutes = require("./routes/resume");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/attachments", taskAttachmentRoutes); 
app.use("/api/sessions", userSessionRoutes);
app.use("/api/pdf", pdfChatRoutes);
app.use("/api/resume", resumeRoutes);




// Error Handling
app.use(errorHandler);


// DB Sync
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
