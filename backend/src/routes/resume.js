// backend/routes/resume.js
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { OpenAI } = require("openai");
require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

let resumeText = ""; // memory me store (cache/DB me bhi rakh sakte ho)

// Upload Resume
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const dataBuffer = req.file;
    const pdfData = await pdfParse(dataBuffer);
    resumeText = pdfData.text;
    res.json({ message: "Resume uploaded & processed ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ask Question
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI Resume Assistant. Answer based only on resume text." },
        { role: "user", content: `Resume:\n${resumeText}\n\nQuestion: ${question}` },
      ],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
