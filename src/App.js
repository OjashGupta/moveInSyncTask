// src/App.js

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import TravellerPage from "./pages/TravellerPage/TravellerPage";
import TravellerManagerPage from "./pages/TravellerManagerPage/TravellerManagerPage";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import FeedbackPage from "./pages/TravellerPage/FeedbackPage/FeedbackPage";
import SubmittedPage from "./pages/SubmittedPage/SubmittedPage";
import AllFeedbacks from "./pages/AllFeedbacks/AllFeedbacks";

function App() {
  axios.defaults.baseURL = "https://4b92-122-173-25-171.ngrok-free.app";
  // axios.defaults.baseURL = "http://localhost:8000";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/traveller_dashboard" element={<TravellerPage />} />
        <Route path="/trip_feedback/:tripId" element={<FeedbackPage />} />
        <Route path="/feedback_submitted" element={<SubmittedPage />} />
        <Route path="/all_feedbacks/:user_id" element={<AllFeedbacks />} />
        <Route
          path="/transport_manager_dashboard"
          element={<TravellerManagerPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
