import React, { useState } from "react";
import api from "../api/api";

export default function AttachmentUpload({ taskId }) {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("task_id", taskId);
    await api.post("/attachments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("File uploaded!");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
