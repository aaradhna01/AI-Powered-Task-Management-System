import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setN] = useState("");
  const [email, setE] = useState("");
  const [password, setP] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Registered! Please login.");
      nav("/login");
    } catch (err) {
      alert(err?.response?.data?.error || "Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={(e) => setN(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setE(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setP(e.target.value)} placeholder="Password" />
        <button>Register</button>
      </form>
    </div>
  );
}
