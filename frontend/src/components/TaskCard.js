import React from "react";

export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>Status: {task.status}</small>
    </div>
  );
}
