// src/pages/Billing.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Billing() {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState("");
  const [guestName, setGuestName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [days, setDays] = useState(0);
  const [rate, setRate] = useState(0); // rate per night
  const [total, setTotal] = useState(null);

  // Hotel details
  const hotel = {
    name: "Ocean View Resort",
    address: "Galle Beach Road, Galle, Sri Lanka",
    contact: "+94 77 123 4567",
    email: "info@oceanview.lk"
  };

  // Fetch all guests/reservations
  useEffect(() => {
    fetch("http://localhost:8080/api/reservations")
      .then(res => res.json())
      .then(data => setGuests(data))
      .catch(err => console.error("Error fetching guests:", err));
  }, []);

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 ? diffDays : 0;
  };

  const handleGuestSelect = (guestId) => {
    setSelectedGuestId(guestId);
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      setGuestName(guest.guestName);
      setRoomType(guest.roomType);
      setCheckIn(guest.checkInDate);
      setCheckOut(guest.checkOutDate);
      const calculatedDays = calculateDays(guest.checkInDate, guest.checkOutDate);
      setDays(calculatedDays);
      setTotal(null);

      // Fetch rate from backend (optional) or hardcode
      fetch(`http://localhost:8080/api/billing?roomType=${guest.roomType}&days=${calculatedDays}`)
        .then(res => res.json())
        .then(data => { setRate(data / calculatedDays); setTotal(data); })
        .catch(err => console.error(err));
    } else {
      setGuestName(""); setRoomType(""); setCheckIn(""); setCheckOut(""); setDays(0); setRate(0); setTotal(null);
    }
  };

  const handlePrint = () => window.print();

  // Styles
  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f0f2f5", padding: 20, fontFamily: "Arial, sans-serif" },
    card: { maxWidth: "700px", margin: "40px auto", padding: "30px", borderRadius: "15px", backgroundColor: "#fff", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" },
    title: { textAlign: "center", color: "#007b7f", fontSize: 28, fontWeight: "bold", marginBottom: 20 },
    select: { width: "100%", padding: 12, marginBottom: 15, borderRadius: 8, border: "1px solid #007b7f", fontSize: 14, backgroundColor: "#e9ecef" },
    input: { width: "100%", padding: 12, marginBottom: 15, borderRadius: 8, border: "1px solid #007b7f", fontSize: 14, backgroundColor: "#e9ecef" },
    buttonPrimary: { width: "100%", padding: 14, backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "bold", fontSize: 16, marginTop: 10 },
    receipt: { borderTop: "2px dashed #007b7f", marginTop: 30, paddingTop: 20 },
    hotelInfo: { textAlign: "center", marginBottom: 20 },
    hotelName: { fontSize: 22, fontWeight: "bold", color: "#007b7f" },
    hotelContact: { fontSize: 14, color: "#555" },
    welcomeMsg: { textAlign: "center", fontStyle: "italic", marginBottom: 20, color: "#007b7f" },
    table: { width: "100%", borderCollapse: "collapse", marginBottom: 20 },
    th: { borderBottom: "1px solid #007b7f", textAlign: "left", padding: "8px", color: "#007b7f" },
    td: { padding: "8px", borderBottom: "1px solid #ddd" },
    total: { textAlign: "right", fontSize: 18, fontWeight: "bold", color: "#28a745" },
    thankYou: { textAlign: "center", marginTop: 20, fontStyle: "italic", color: "#007b7f" },
    printBtn: { width: "100%", padding: 12, backgroundColor: "#007b7f", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "bold", transition: "0.3s" }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.card}>
        <h2 style={styles.title}>Billing & Receipt</h2>

        {/* Guest dropdown */}
        <select value={selectedGuestId} onChange={(e) => handleGuestSelect(e.target.value)} style={styles.select}>
          <option value="">Select Guest</option>
          {guests.map(g => (
            <option key={g.id} value={g.id}>{g.guestName}</option>
          ))}
        </select>

        {/* Auto-filled fields */}
        <input type="text" placeholder="Guest Name" value={guestName} readOnly style={styles.input} />
        <input type="text" placeholder="Room Type" value={roomType} readOnly style={styles.input} />
        <input type="date" value={checkIn} readOnly style={styles.input} />
        <input type="date" value={checkOut} readOnly style={styles.input} />
        <input type="number" value={days} readOnly placeholder="Number of Days" style={styles.input} />

        {total !== null && (
          <div style={styles.receipt}>
            <div style={styles.hotelInfo}>
              <div style={styles.hotelName}>{hotel.name}</div>
              <div style={styles.hotelContact}>{hotel.address}</div>
              <div style={styles.hotelContact}>Tel: {hotel.contact} | Email: {hotel.email}</div>
            </div>

            <div style={styles.welcomeMsg}>Welcome to {hotel.name}! We hope you enjoy your stay.</div>

            <table style={styles.table}>
              <tbody>
                <tr>
                  <th style={styles.th}>Guest Name</th>
                  <td style={styles.td}>{guestName}</td>
                </tr>
                <tr>
                  <th style={styles.th}>Room Type</th>
                  <td style={styles.td}>{roomType}</td>
                </tr>
                <tr>
                  <th style={styles.th}>Check-In</th>
                  <td style={styles.td}>{checkIn}</td>
                </tr>
                <tr>
                  <th style={styles.th}>Check-Out</th>
                  <td style={styles.td}>{checkOut}</td>
                </tr>
                <tr>
                  <th style={styles.th}>Days Stayed</th>
                  <td style={styles.td}>{days}</td>
                </tr>
                <tr>
                  <th style={styles.th}>Rate Per Night</th>
                  <td style={styles.td}>{rate}</td>
                </tr>
                <tr>
                  <th style={styles.th}>Total Amount</th>
                  <td style={styles.td}>{total}</td>
                </tr>
              </tbody>
            </table>

            <div style={styles.thankYou}>Thank you for staying with us! Come again soon.</div>

            <button style={styles.printBtn} onClick={handlePrint}>Print Receipt</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;