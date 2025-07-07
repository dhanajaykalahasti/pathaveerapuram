
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const correct = localStorage.getItem("adminPassword") || "pvp123";
    if (password === correct) {
      localStorage.setItem("auth", "true");
      navigate("/admin");
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="admin-container">
      <h2>Login to Admin Panel</h2>
      <form onSubmit={handleLogin}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
