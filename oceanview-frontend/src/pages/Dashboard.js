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
      backgroundImage: `url(${dashboardImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#fff",
    },
    title: { textAlign: "center", fontSize: 36, fontWeight: "bold", marginBottom: 30, textShadow: "2px 2px 6px rgba(0,0,0,0.5)" },
    cardContainer: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 20 },
    card: {
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: 30,
      borderRadius: 10,
      textAlign: "center",
      minWidth: 200,
      cursor: "pointer",
      transition: "transform 0.2s",
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.title}>Ocean View Resort Dashboard</h1>

      <div style={styles.cardContainer}>
        {/* Reservation */}
        <div
          style={styles.card}
          onClick={() => navigate("/reservation")}
          onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        >
          <h3>Reservation</h3>
          <p>Manage bookings and guests</p>
        </div>

        {/* Billing */}
        <div
          style={styles.card}
          onClick={() => navigate("/billing")}
          onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        >
          <h3>Billing</h3>
          <p>Calculate and print invoices</p>
        </div>

        {/* Help */}
        <div
          style={styles.card}
          onClick={() => navigate("/help")}
          onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        >
          <h3>Help</h3>
          <p>System instructions for staff</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;