// src/pages/Reservation.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Reservation() {
  const [guestName, setGuestName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [roomType, setRoomType] = useState("single");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [reservations, setReservations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReservations = () => {
    fetch("http://localhost:8080/api/reservations")
      .then((res) => res.json())
      .then(setReservations);
  };

  useEffect(() => { fetchReservations(); }, []);

  const handleAddOrUpdate = () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const body = { 
      guestName, 
      address, 
      phone, 
      roomType, 
      checkInDate: checkIn, 
      checkOutDate: checkOut, 
      status: "confirm" 
    };

    if(editId){
      fetch(`http://localhost:8080/api/reservations/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => { fetchReservations(); handleClear(); setEditId(null); });
    } else {
      fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => { fetchReservations(); handleClear(); });
    }
  };

  const handleClear = () => {
    setGuestName(""); setAddress(""); setPhone("");
    setRoomType("single"); setCheckIn(""); setCheckOut("");
    setEditId(null);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/reservations/${id}`, { method: "DELETE" })
      .then(() => fetchReservations());
  };

  const handleEdit = (r) => {
    setEditId(r.id);
    setGuestName(r.guestName);
    setAddress(r.address);
    setPhone(r.phone);
    setRoomType(r.roomType);
    setCheckIn(r.checkInDate);
    setCheckOut(r.checkOutDate);
  };

  const filteredReservations = reservations.filter(r => {
    if(statusFilter !== "all" && r.status !== statusFilter) return false;
    if(user.role === "RECEPTIONIST" && (r.status === "checkout" || r.status === "canceled")) return false;
    return true;
  });

  // CSS styles
  const styles = {
    container: { padding: 30, fontFamily: "Arial, sans-serif", backgroundColor: "#f7f7f7", minHeight: "100vh" },
    title: { textAlign: "center", color: "#333" },
    formCard: { backgroundColor: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 30 },
    input: { width: "100%", padding: 10, marginBottom: 15, borderRadius: 4, border: "1px solid #ccc", fontSize: 14 },
    select: { width: "100%", padding: 10, marginBottom: 15, borderRadius: 4, border: "1px solid #ccc", fontSize: 14 },
    buttonPrimary: { padding: "10px 20px", marginRight: 10, border: "none", borderRadius: 4, backgroundColor: "#007bff", color: "#fff", cursor: "pointer", fontSize: 14 },
    buttonSecondary: { padding: "10px 20px", border: "none", borderRadius: 4, backgroundColor: "#6c757d", color: "#fff", cursor: "pointer", fontSize: 14 },
    table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: 8, overflow: "hidden" },
    th: { textAlign: "left", padding: 10, backgroundColor: "#007bff", color: "#fff" },
    td: { padding: 10, borderBottom: "1px solid #ddd" },
    actionBtn: { marginRight: 5, padding: "5px 10px", border: "none", borderRadius: 4, cursor: "pointer" },
    editBtn: { backgroundColor: "#28a745", color: "#fff" },
    deleteBtn: { backgroundColor: "#dc3545", color: "#fff" }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.title}>Reservation Management</h2>

      {/* Form */}
      <div style={styles.formCard}>
        <label>Status Filter:</label>
        <select style={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="confirm">Confirm</option>
          <option value="canceled">Canceled</option>
          <option value="checkout">Checkout</option>
        </select>

        <input style={styles.input} placeholder="Guest Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
        <input style={styles.input} placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input style={styles.input} placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <select style={styles.select} value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option>single</option>
          <option>double</option>
          <option>deluxe</option>
          <option>suite</option>
        </select>
        <input style={styles.input} type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        <input style={styles.input} type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

        <button style={styles.buttonPrimary} onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button style={styles.buttonSecondary} onClick={handleClear}>Clear</button>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Guest</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Room</th>
            <th style={styles.th}>CheckIn</th>
            <th style={styles.th}>CheckOut</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map(r => {
            const canEdit = user.role === "ADMIN" || (user.role === "RECEPTIONIST" && r.status === "confirm");
            return (
              <tr key={r.id}>
                <td style={styles.td}>{r.guestName}</td>
                <td style={styles.td}>{r.address}</td>
                <td style={styles.td}>{r.phone}</td>
                <td style={styles.td}>{r.roomType}</td>
                <td style={styles.td}>{r.checkInDate}</td>
                <td style={styles.td}>{r.checkOutDate}</td>
                <td style={styles.td}>{r.status}</td>
                <td style={styles.td}>
                  {canEdit && <button style={{...styles.actionBtn, ...styles.editBtn}} onClick={() => handleEdit(r)}>Edit</button>}
                  {canEdit && <button style={{...styles.actionBtn, ...styles.deleteBtn}} onClick={() => handleDelete(r.id)}>Delete</button>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Reservation;