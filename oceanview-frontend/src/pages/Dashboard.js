// src/pages/Dashboard.js
import React from "react";
import Navbar from "../components/Navbar";
import dashboardImg from "../assets/dashboard.webp";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      padding: 20,
      fontFamily: "Arial, sans-serif",
      position: "relative",
      color: "#fff",
    },
    backgroundImg: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover", // keeps sharpness
      zIndex: -1,
      filter: "brightness(0.7)", // slightly dark for text readability
    },
    title: {
      textAlign: "center",
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 30,
      textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
      position: "relative",
      zIndex: 1,
    },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 20,
      zIndex: 1,
      position: "relative",
      marginBottom: 50,
    },
    card: {
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: 30,
      borderRadius: 10,
      textAlign: "center",
      minWidth: 200,
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#fff",
    },
    infoContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 20,
      zIndex: 1,
      position: "relative",
    },
    infoCard: {
      backgroundColor: "rgba(0,0,0,0.4)",
      padding: 20,
      borderRadius: 10,
      minWidth: 220,
      textAlign: "center",
      color: "#fff",
      transition: "all 0.3s ease",
      cursor: "default",
    },
    infoTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    infoText: { fontSize: 16, marginBottom: 5 },
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.7)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 5px 10px rgba(0,0,0,0.5)";
  };

  return (
    <div style={styles.container}>
      {/* Sharp background image */}
      <img src={dashboardImg} alt="Dashboard" style={styles.backgroundImg} />

      <Navbar />

      <h1 style={styles.title}>Welcome To Ocean View Resort!</h1>

      {/* Main Action Cards */}
      <div style={styles.cardContainer}>
        <div
          style={styles.card}
          onClick={() => navigate("/reservation")}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <h3>Reservation</h3>
          <p>Manage bookings and guests</p>
        </div>

        <div
          style={styles.card}
          onClick={() => navigate("/billing")}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <h3>Billing</h3>
          <p>Calculate and print invoices</p>
        </div>

        <div
          style={styles.card}
          onClick={() => navigate("/help")}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <h3>Help</h3>
          <p>System instructions for staff</p>
        </div>
      </div>

      {/* Contact / Info Cards */}
      <div style={styles.infoContainer}>
        <div
          style={styles.infoCard}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <div style={styles.infoTitle}>Contact Number</div>
          <div style={styles.infoText}>+94 77 123 4567</div>
        </div>

        <div
          style={styles.infoCard}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <div style={styles.infoTitle}>Email</div>
          <div style={styles.infoText}>info@oceanview.lk</div>
        </div>

        <div
          style={styles.infoCard}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <div style={styles.infoTitle}>Website</div>
          <div style={styles.infoText}>www.oceanview.lk</div>
        </div>

        <div
          style={styles.infoCard}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <div style={styles.infoTitle}>Find Us</div>
          <div style={styles.infoText}>Galle, Sri Lanka</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;