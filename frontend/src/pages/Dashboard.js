// import React, { useEffect, useState } from "react";
// import api from "../api/api"; // backend se connect karne ke liye
// import "./Dashboard.css";

// export default function Dashboard() {
//   const [summary, setSummary] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;

//     api.get("/dashboard", {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => setSummary(res.data.summary))
//       .catch(err => console.error("Dashboard fetch error:", err));
//   }, [token]);

//   if (!summary) {
//     return <p>Loading Dashboard...</p>;
//   }

//   return (
//     <div className="dashboard">
//       <h1>📊 Dashboard</h1>
//       <div className="cards">
//         <div className="card">
//           <h3>Pending Tasks</h3>
//           <p>{summary.pending}</p>
//         </div>
//         <div className="card">
//           <h3>Completed Tasks</h3>
//           <p>{summary.completed}</p>
//         </div>
//         <div className="card">
//           <h3>Overdue</h3>
//           <p>{summary.overdue}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSummary(res.data.summary))
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, [token]);

  if (!summary) return <p>Loading Dashboard...</p>;

  return (
    <div className="dashboard">
      <h1>📊 Dashboard</h1>
      <div className="cards">
        <div className="card">
          <h3>Pending Tasks</h3>
          <p>{summary.pending}</p>
        </div>
        <div className="card">
          <h3>Completed Tasks</h3>
          <p>{summary.completed}</p>
        </div>
        <div className="card">
          <h3>Overdue</h3>
          <p>{summary.overdue}</p>
        </div>
      </div>
    </div>
  );
}
