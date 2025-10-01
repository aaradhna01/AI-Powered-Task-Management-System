import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setE] = useState("");
  const [password, setP] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/");
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={(e) => setE(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setP(e.target.value)} placeholder="Password" />
        <button>Login</button>
      </form>
    </div>
  );
}
