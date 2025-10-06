// controllers/pdfChatController.js
const fs = require("fs");
const pdfParse = require("pdf-parse");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let pdfTextCache = {}; // Temporary memory store (user-based)

// Upload PDF and extract text
async function uploadPDF(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(pdfBuffer);

    // Store PDF text for that user
    pdfTextCache[req.user?.id || "guest"] = data.text;

    res.json({ message: "PDF uploaded successfully!", preview: data.text.slice(0, 300) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Ask question about the uploaded PDF
async function askPDF(req, res) {
  try {
    const { question } = req.body;
    const text = pdfTextCache[req.user?.id || "guest"];

    if (!text) {
      return res.status(400).json({ error: "No PDF uploaded yet!" });
    }

    const prompt = `Answer this question based on the following resume text:\n\n${text}\n\nQuestion: ${question}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant that analyzes resumes." },
        { role: "user", content: prompt },
      ],
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { uploadPDF, askPDF };
