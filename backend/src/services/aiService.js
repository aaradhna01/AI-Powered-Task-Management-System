const openai = require("../config/openai");

async function categorizeTask(description) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a task categorizer." },
      { role: "user", content: description }
    ],
  });
  return res.choices[0].message.content;
}

module.exports = { categorizeTask };
