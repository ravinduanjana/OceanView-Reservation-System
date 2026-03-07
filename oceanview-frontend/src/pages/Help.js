// src/pages/Help.js
import React from "react";
import Navbar from "../components/Navbar";
import dashboardImage from "../assets/dashboard.webp";

function Help() {
  const helpSteps = [
    "Login with your registered account.",
    "Receptionists manage reservations & billing.",
    "Admins manage users & room rates.",
    "Use Reservation page to add, edit, or delete bookings.",
    "Use Billing page to calculate and print receipts.",
    "Click Logout to securely exit the system."
  ];

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.background}></div>

      <div style={styles.overlay}>
        <h1 style={styles.headerTitle}>System Help Guide</h1>

        <div style={styles.timeline}>
          {helpSteps.map((step, index) => (
            <div key={index} style={styles.timelineItem}>
              <div style={styles.circle}>{index + 1}</div>
              <div style={styles.card}>{step}</div>
              {index !== helpSteps.length - 1 && <div style={styles.line}></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: { position: "relative", minHeight: "100vh", fontFamily: "Arial, sans-serif" },
  background: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundImage: `url(${dashboardImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.4)",
    zIndex: -1
  },
  overlay: { position: "relative", padding: "30px 20px", display: "flex", flexDirection: "column", alignItems: "center" },
  headerTitle: { color: "#fff", fontSize: "28px", fontWeight: "bold", marginBottom: "30px", textShadow: "1px 1px 8px rgba(0,0,0,0.6)" },
  timeline: { display: "flex", flexDirection: "column", alignItems: "center" },
  timelineItem: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px", position: "relative" },
  circle: { width: "35px", height: "35px", borderRadius: "50%", backgroundColor: "#28a745", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: "14px", boxShadow: "0 3px 10px rgba(0,0,0,0.3)", zIndex: 2 },
  line: { width: "3px", height: "30px", backgroundColor: "#28a745", marginTop: "-3px", zIndex: 1 },
  card: { backgroundColor: "rgba(0,0,0,0.85)", color: "#fff", padding: "15px", borderRadius: "10px", width: "300px", marginTop: "15px", textAlign: "center", boxShadow: "0 3px 15px rgba(0,0,0,0.4)", cursor: "pointer", transition: "0.3s" }
};

export default Help;