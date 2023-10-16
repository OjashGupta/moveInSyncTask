// src/App.js

import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import TravelerPage from "./pages/TravelerPage/TravellerPage";
import TransportManagerPage from "./pages/TransportManager/TransportManagerPage";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import FeedbackPage from "./pages/TransportManager/FeedbackPage/FeedbackPage";
import SubmittedPage from "./pages/SubmittedPage/SubmittedPage";

function App() {
  axios.defaults.baseURL = "https://4b92-122-173-25-171.ngrok-free.app";
  // axios.defaults.baseURL = "http://localhost:8000";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/traveller_dashboard" element={<TravelerPage />} />
        <Route path="/trip_feedback/:tripId" element={<FeedbackPage />} />
        <Route path="/feedback_submitted" element={<SubmittedPage />} />
        <Route
          path="/transport_manager_dashboard"
          element={<TransportManagerPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
