// routes/pdfChat.js
const express = require("express");
const multer = require("multer");
const { uploadPDF, askPDF } = require("../controllers/pdfChatController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Protected Routes
router.post("/upload", authMiddleware, upload.single("file"), uploadPDF);
router.post("/ask", authMiddleware, askPDF);

module.exports = router;
