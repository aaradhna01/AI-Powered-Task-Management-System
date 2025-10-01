const express = require("express");
const authMiddleware = require("../middleware/auth");
const { categorizeTask, suggestPriority, getProductivityInsights } = require("../controllers/aiController");

const router = express.Router();

// Protected AI routes
router.post("/categorize-task", authMiddleware, categorizeTask);
router.post("/suggest-priority", authMiddleware, suggestPriority);
router.get("/productivity-insights", authMiddleware, getProductivityInsights);

module.exports = router;
