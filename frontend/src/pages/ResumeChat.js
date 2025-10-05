// src/pages/ResumeChat.js
import React, { useState } from "react";
import axios from "axios";

export default function ResumeChat() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) return alert("Please select a resume (PDF)!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Resume uploaded successfully ✅");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Upload failed: " + err.message);
    }
  };

  const askQuestion = async () => {
    if (!question) return;
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/resume/ask", { question });
      setAnswer(res.data.answer);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chat with Your Resume</h2>

      {/* Resume Upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />
      <button onClick={uploadResume} className="bg-blue-500 text-white px-3 py-1 rounded">
        Upload Resume
      </button>

      {/* Ask Question */}
      <div className="mt-5">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something about your resume..."
          className="w-full border p-2 rounded"
        />
        <button
          onClick={askQuestion}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          Ask AI
        </button>
      </div>

      {/* Answer */}
      {loading ? (
        <p className="mt-3 text-gray-500">Thinking...</p>
      ) : (
        answer && <div className="mt-4 p-3 border rounded bg-gray-100">{answer}</div>
      )}
    </div>
  );
}
