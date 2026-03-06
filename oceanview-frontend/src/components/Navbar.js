// src/components/Navbar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkStyle = (path) => ({
    marginRight: 15,
    fontWeight: location.pathname === path ? "bold" : "normal",
    textDecoration: "none",
    color: "blue"
  });

  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc", marginBottom: 20 }}>
      <Link to="/reservation" style={linkStyle("/reservation")}>Reservation</Link>
      <Link to="/billing" style={linkStyle("/billing")}>Billing</Link>
      <Link to="/help" style={linkStyle("/help")}>Help</Link>
      <button onClick={handleLogout} style={{ marginLeft: 20 }}>Logout</button>
      <span style={{ float: "right" }}>Logged in as: {user?.username} ({user?.role})</span>
    </nav>
  );
}

export default Navbar;