const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const OpenAI = require("openai");

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let pdfContext = ""; // simple store, can be per-user in DB

// Upload PDF
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const dataBuffer = req.file;
    const fs = require("fs");
    const fileBuffer = fs.readFileSync(dataBuffer.path);

    const pdfData = await pdfParse(fileBuffer);
    pdfContext = pdfData.text; // store text

    res.json({ message: "PDF uploaded successfully", preview: pdfContext.slice(0, 200) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ask Question
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!pdfContext) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant that answers questions from PDF content." },
        { role: "user", content: `PDF Content: ${pdfContext}\n\nQuestion: ${question}` }
      ],
    });

    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
