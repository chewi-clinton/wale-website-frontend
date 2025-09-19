// src/Pages/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Admin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      navigate("/admin/products");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Login</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="admin-button">
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
