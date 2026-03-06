// src/pages/Help.js
import React from "react";
import Navbar from "../components/Navbar";

function Help() {
  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center" }}>System Help Guide</h2>

          <ul style={{ lineHeight: "28px" }}>
            <li>Login using your registered account.</li>
            <li>Receptionists can manage reservations and billing.</li>
            <li>Admins can manage users and room rates.</li>
            <li>Use Reservation page to add, update or delete bookings.</li>
            <li>Use Billing page to calculate and print receipts.</li>
            <li>Click Logout to securely exit the system.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "50px"
};

const cardStyle = {
  width: "600px",
  padding: "30px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 0 15px rgba(0,0,0,0.1)"
};

export default Help;