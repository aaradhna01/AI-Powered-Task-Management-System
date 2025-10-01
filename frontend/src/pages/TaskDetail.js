import React from "react";
import { useParams } from "react-router-dom";

export default function TaskDetail() {
  const { id } = useParams();
  return (
    <div>
      <h2>Task Detail - {id}</h2>
      <p>Task details and attachments go here.</p>
    </div>
  );
}
