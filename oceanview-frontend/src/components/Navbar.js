// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // State for logged-in user
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  // Read username and role from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUsername && storedRole) {
      setUsername(storedUsername);
      setRole(storedRole);
    }
  }, []);

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#000",
      padding: "10px 30px",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 4px 6px rgba(0,0,0,0.5)"
    },
    logo: {
      fontSize: 24,
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
      color: "#fff"
    },
    menu: {
      display: "flex",
      gap: "20px",
      alignItems: "center"
    },
    menuItem: {
      textDecoration: "none",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "5px",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    userBox: {
      backgroundColor: "rgba(255,255,255,0.1)",
      padding: "5px 12px",
      borderRadius: 5,
      fontSize: 14,
      color: "#fff",
      transition: "all 0.3s ease",
      cursor: "default"
    }
  };

  // Hover effects
  const handleHover = (e) => {
    e.currentTarget.style.backgroundColor = "#333";
    e.currentTarget.style.transform = "scale(1.1)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.transform = "scale(1)";
  };

  // Logout with confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();          // clear login info
      navigate("/", { replace: true }); // redirect to login page
    }
  };

  return (
    <div style={styles.navbar}>
      {/* Logo */}
      <div
        style={styles.logo}
        onClick={() => navigate("/dashboard")}
      >
        Ocean View Resort Reservations
      </div>

      {/* Menu */}
      <div style={styles.menu}>
        <Link
          to="/reservation"
          style={styles.menuItem}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          Reservation
        </Link>
        <Link
          to="/billing"
          style={styles.menuItem}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          Billing
        </Link>
        <Link
          to="/help"
          style={styles.menuItem}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          Help
        </Link>

        {/* Logout */}
        <div
          style={styles.menuItem}
          onClick={handleLogout}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          Logout
        </div>

        {/* Logged-in user */}
        {username && role && (
          <div style={styles.userBox}>
            Logged in as: <b>{username}</b> ({role.toLowerCase()})
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;