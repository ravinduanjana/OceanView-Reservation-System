// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("RECEPTIONIST");
  const [showPassword, setShowPassword] = useState(false);
  const [adminName, setAdminName] = useState(""); // admin username to authorize
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !adminName) {
      alert("Fill all fields including Admin username");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users?username=${adminName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      alert("Account created successfully!");
      navigate("/"); // go to login page
    } catch (error) {
      alert("Error creating account: " + error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={eyeStyle}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
          <option value="RECEPTIONIST">Receptionist</option>
          <option value="ADMIN">Admin</option>
        </select>

        <input
          type="text"
          placeholder="Admin username to authorize"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleRegister} style={buttonStyle}>
          Create Account
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account? <Link to="/" style={{ color: "#007bff" }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f9"
};

const cardStyle = {
  width: "400px", padding: "30px", backgroundColor: "white",
  borderRadius: "10px", boxShadow: "0 0 20px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width: "100%", padding: "10px", marginBottom: "15px",
  borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px"
};

const buttonStyle = {
  width: "100%", padding: "10px", backgroundColor: "#28a745",
  color: "white", border: "none", borderRadius: "5px",
  cursor: "pointer", fontSize: "15px"
};

const eyeStyle = {
  position: "absolute", right: "10px", top: "12px", cursor: "pointer"
};

export default Register;