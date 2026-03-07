// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("RECEPTIONIST");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!username || !password || !adminPassword) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/users?adminPassword=${adminPassword}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            role,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      alert("Account created successfully!");
      navigate("/");

    } catch (error) {
      alert("Error creating account: " + error.message);
    }
  };

  return (

    <div className="register-container">

      <div className="register-card">

        <h2>Create Account</h2>
        <p className="subtitle">Ocean View Resort System</p>

        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-field">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>

        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="RECEPTIONIST">Receptionist</option>
          <option value="ADMIN">Administrator</option>
        </select>

        <input
          type="password"
          placeholder="Admin Password (Authorization)"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Create Account
        </button>

        <p className="login-link">
          Already have an account? <Link to="/">Sign In</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;