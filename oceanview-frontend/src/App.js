import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Reservation from "./pages/Reservation";
import Billing from "./pages/Billing";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;