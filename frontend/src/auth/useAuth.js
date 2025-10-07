
// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Check localStorage token on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser({ token }); // simple user object
//     }
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("refreshToken", res.data.refreshToken);
//     setUser({ token: res.data.token });
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default function useAuth() {
//   return useContext(AuthContext);
// }

// src/auth/useAuth.js
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔁 On page reload → check token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser({ token: res.data.token });
  };

  const register = async (name, email, password) => {
    await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
