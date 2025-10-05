import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // custom css

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Task Manager</div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
         <Link to="/pdf-chat">Chat with PDF</Link>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}
