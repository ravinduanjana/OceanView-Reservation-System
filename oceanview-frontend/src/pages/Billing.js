// src/pages/Billing.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Billing() {
  const [guestName, setGuestName] = useState("");
  const [roomType, setRoomType] = useState("single");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(null);

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 ? diffDays : 0;
  };

  const handleDateChange = (start, end) => {
    const calculatedDays = calculateDays(start, end);
    setDays(calculatedDays);
  };

  const handleCalculate = () => {
    if (days <= 0) {
      alert("Please select valid check-in and check-out dates");
      return;
    }

    fetch(`http://localhost:8080/api/billing?roomType=${roomType}&days=${days}`)
      .then(res => res.json())
      .then(data => setTotal(data));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Navbar />

      <div style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9"
      }}>
        <h2 style={{ textAlign: "center" }}>Billing & Receipt</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>Guest Name</label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Check-in Date</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              handleDateChange(e.target.value, checkOut);
            }}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Check-out Date</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              handleDateChange(checkIn, e.target.value);
            }}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Number of Days</label>
          <input
            type="number"
            value={days}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              backgroundColor: "#e9ecef"
            }}
          />
        </div>

        <button
          onClick={handleCalculate}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Calculate Bill
        </button>

        {total !== null && (
          <div style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <h3 style={{ textAlign: "center" }}>Receipt</h3>
            <p><strong>Guest:</strong> {guestName}</p>
            <p><strong>Room Type:</strong> {roomType}</p>
            <p><strong>Check-in:</strong> {checkIn}</p>
            <p><strong>Check-out:</strong> {checkOut}</p>
            <p><strong>Days Stayed:</strong> {days}</p>
            <hr />
            <h2>Total Amount: {total}</h2>

            <button
              onClick={handlePrint}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "8px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Print Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;