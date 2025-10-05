import React, { useState } from "react";
import api from "../api/api";

export default function PdfChat() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const uploadPDF = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/pdf/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert(res.data.message);
    setUploaded(true);
  };

  const askQuestion = async () => {
    const res = await api.post("/pdf/ask", { question });
    setAnswer(res.data.answer);
  };

  return (
    <div className="pdf-chat">
      <h2>Chat with PDF (GenAI)</h2>

      {!uploaded ? (
        <div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={uploadPDF}>Upload PDF</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about PDF"
          />
          <button onClick={askQuestion}>Ask</button>
          {answer && (
            <div className="answer-box">
              <h4>Answer:</h4>
              <p>{answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
