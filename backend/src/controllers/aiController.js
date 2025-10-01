const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const Task = require("../models/Task");

// AI Task Categorization
async function categorizeTask(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI that categorizes tasks into categories like Work, Personal, Shopping, etc." },
        { role: "user", content: `Task: ${title} - ${description}` }
      ],
    });

    const category = response.choices[0].message.content.trim();
    res.json({ category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// AI Priority Suggestion
async function suggestPriority(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI that suggests task priority: high, medium, low." },
        { role: "user", content: `Task: ${title} - ${description}` }
      ],
    });

    const priority = response.choices[0].message.content.trim();
    res.json({ priority });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// AI Productivity Insights
async function getProductivityInsights(req, res) {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI that analyzes user tasks and gives productivity insights." },
        { role: "user", content: `Tasks: ${JSON.stringify(tasks)}` }
      ],
    });

    const insights = response.choices[0].message.content.trim();
    res.json({ insights });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { categorizeTask, suggestPriority, getProductivityInsights };
