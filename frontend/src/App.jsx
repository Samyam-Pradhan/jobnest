import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobDetails from "./pages/JobDetails";
import Savedjobs from "./pages/Savedjobs"; // new import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
       <Route path="/saved-jobs" element={<Savedjobs />} />
      </Routes>
    </Router>
  );
}

export default App;
