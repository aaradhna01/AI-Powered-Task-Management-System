const express = require("express");
const authMiddleware = require("../middleware/auth");
const { categorizeTask, suggestPriority, getProductivityInsights } = require("../controllers/aiController");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const OpenAI = require("openai");
require("dotenv").config();

const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Upload Resume (PDF)
router.post("/upload-resume", upload.single("pdf"), async (req, res) => {
  try {
    const pdfData = await pdfParse(req.file);
    resumeText = pdfData.text;
    res.json({ message: "Resume uploaded and processed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing PDF" });
  }
});

// Ask Question about Resume
router.post("/ask-resume", async (req, res) => {
  const { question } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: "Please upload a resume first" });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant that answers questions about the user's resume." },
        { role: "user", content: `Resume:\n${resumeText}` },
        { role: "user", content: `Question: ${question}` },
      ],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating answer" });
  }
});


// Protected AI routes
router.post("/categorize-task", authMiddleware, categorizeTask);
router.post("/suggest-priority", authMiddleware, suggestPriority);
router.get("/productivity-insights", authMiddleware, getProductivityInsights);


module.exports = router;
