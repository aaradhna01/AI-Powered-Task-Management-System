import React, { useState } from "react";
import axios from "axios";

export default function ChatWithPDF() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const uploadResume = async () => {
    if (!file) return alert("Please upload a PDF file");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    }
  };

  const askQuestion = async () => {
    if (!question) return;
    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask-resume", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chat with Your Resume (PDF)</h2>

      {/* Upload Resume */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadResume} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
        Upload Resume
      </button>

      {/* Ask Questions */}
      <div className="mt-6">
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your resume..."
        />
        <button onClick={askQuestion} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">
          Ask
        </button>
      </div>

      {/* Answer */}
      {answer && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
