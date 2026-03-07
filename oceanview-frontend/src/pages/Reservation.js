// src/pages/Reservation.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Reservation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [guestName, setGuestName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [roomType, setRoomType] = useState("single");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reservations, setReservations] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchReservations = () => {
    fetch("http://localhost:8080/api/reservations")
      .then(res => res.json())
      .then(setReservations)
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchReservations(); }, []);

  const handleAddOrUpdate = () => {
    if (!guestName || !address || !phone || !checkIn || !checkOut) {
      alert("Please fill all fields!");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const body = { guestName, address, phone, roomType, checkInDate: checkIn, checkOutDate: checkOut, status: "confirm" };

    if(editId){
      fetch(`http://localhost:8080/api/reservations/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).then(() => { fetchReservations(); handleClear(); setEditId(null); });
    } else {
      fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).then(() => { fetchReservations(); handleClear(); });
    }
  };

  const handleClear = () => {
    setGuestName(""); setAddress(""); setPhone("");
    setRoomType("single"); setCheckIn(""); setCheckOut(""); setEditId(null);
  };

  const handleEdit = (r) => {
    setEditId(r.id);
    setGuestName(r.guestName); setAddress(r.address);
    setPhone(r.phone); setRoomType(r.roomType);
    setCheckIn(r.checkInDate); setCheckOut(r.checkOutDate);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this reservation?")){
      fetch(`http://localhost:8080/api/reservations/${id}`, { method: "DELETE" })
        .then(() => fetchReservations());
    }
  };

  const filteredReservations = reservations.filter(r => {
    if(statusFilter !== "all" && r.status !== statusFilter) return false;
    return true;
  });

  // Elegant colorful styles
  const styles = {
    container: { minHeight: "100vh", padding: 20, fontFamily: "Arial, sans-serif", backgroundColor: "#e9f7f9" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    title: { fontSize: 28, fontWeight: "bold", color: "#007b7f" },
    dashboardBtn: { padding: "8px 16px", borderRadius: 8, border: "none", backgroundColor: "#007b7f", color: "#fff", cursor: "pointer", transition: "0.3s" },
    formCard: { backgroundColor: "#ffffffcc", padding: 25, borderRadius: 15, boxShadow: "0 8px 20px rgba(0,0,0,0.15)", marginBottom: 30 },
    input: { width: "100%", padding: 12, marginBottom: 15, borderRadius: 8, border: "1px solid #007b7f", fontSize: 14 },
    select: { width: "100%", padding: 12, marginBottom: 15, borderRadius: 8, border: "1px solid #007b7f", fontSize: 14 },
    buttonPrimary: { padding: "12px 22px", marginRight: 10, borderRadius: 8, border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer", fontWeight: "bold", transition: "0.3s" },
    buttonSecondary: { padding: "12px 22px", borderRadius: 8, border: "none", backgroundColor: "#ffc107", color: "#fff", cursor: "pointer", fontWeight: "bold", transition: "0.3s" },
    cardsContainer: { display: "flex", flexWrap: "wrap", gap: 20 },
    card: { backgroundColor: "#fff", borderRadius: 15, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", padding: 20, flex: "1 1 250px", transition: "0.3s", cursor: "pointer", position: "relative" },
    cardHover: { transform: "translateY(-8px) scale(1.02)", boxShadow: "0 12px 25px rgba(0,0,0,0.2)" },
    cardTitle: { fontWeight: "bold", marginBottom: 10, fontSize: 18, color: "#007b7f" },
    cardText: { fontSize: 14, marginBottom: 6, color: "#555" },
    actionBtn: { marginRight: 8, padding: "6px 12px", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "bold" },
    editBtn: { backgroundColor: "#17a2b8", color: "#fff" },
    deleteBtn: { backgroundColor: "#dc3545", color: "#fff" }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.header}>
        <h2 style={styles.title}>Reservation Management</h2>
        <button style={styles.dashboardBtn} onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>

      {/* Reservation Form */}
      <div style={styles.formCard}>
        <label>Status Filter:</label>
        <select style={styles.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="confirm">Confirm</option>
          <option value="canceled">Canceled</option>
          <option value="checkout">Checkout</option>
        </select>

        <input style={styles.input} placeholder="Guest Name" value={guestName} onChange={e => setGuestName(e.target.value)} />
        <input style={styles.input} placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <input style={styles.input} placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        <select style={styles.select} value={roomType} onChange={e => setRoomType(e.target.value)}>
          <option>single</option>
          <option>double</option>
          <option>deluxe</option>
          <option>suite</option>
        </select>
        <input style={styles.input} type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        <input style={styles.input} type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />

        <button style={styles.buttonPrimary} onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button style={styles.buttonSecondary} onClick={handleClear}>Clear</button>
      </div>

      {/* Reservation Cards */}
      <div style={styles.cardsContainer}>
        {filteredReservations.map(r => {
          const canEditDelete = user.role === "ADMIN";
          return (
            <div
              key={r.id}
              style={styles.card}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={styles.cardTitle}>{r.guestName} ({r.roomType})</div>
              <div style={styles.cardText}><strong>Address:</strong> {r.address}</div>
              <div style={styles.cardText}><strong>Phone:</strong> {r.phone}</div>
              <div style={styles.cardText}><strong>Check-In:</strong> {r.checkInDate}</div>
              <div style={styles.cardText}><strong>Check-Out:</strong> {r.checkOutDate}</div>
              <div style={styles.cardText}><strong>Status:</strong> <span style={{color: r.status==="canceled" ? "#dc3545" : r.status==="checkout" ? "#6c757d" : "#28a745"}}>{r.status}</span></div>
              {canEditDelete &&
                <div style={{marginTop: 10}}>
                  <button style={{...styles.actionBtn, ...styles.editBtn}} onClick={() => handleEdit(r)}>Edit</button>
                  <button style={{...styles.actionBtn, ...styles.deleteBtn}} onClick={() => handleDelete(r.id)}>Delete</button>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reservation;