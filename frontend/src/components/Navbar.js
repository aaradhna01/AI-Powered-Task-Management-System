
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../auth/useAuth";
// import "./Navbar.css";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">✨ Task Manager</div>
//       <div className="navbar-links">
//         {user ? (
//           <>
//             <Link to="/" className="nav-link">Dashboard</Link>
//             <Link to="/tasks" className="nav-link">Tasks</Link>
//             <Link to="/chat" className="nav-link">Chat with PDF</Link>
//             <button className="logout-btn" onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="nav-link">Login</Link>
//             <Link to="/register" className="nav-link">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">✨ Task Manager</h2>
      <div className="links">
        {user ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/chat-pdf">Chat with PDF</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
