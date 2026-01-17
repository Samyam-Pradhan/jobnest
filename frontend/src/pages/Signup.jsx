import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Signup() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // role set from Home page

  const [name, setName] = useState(""); // only for Job Seeker
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/register/";

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Prepare payload for backend
    let data = {
      email,
      password,
      password2,
      role: role === "jobseeker" ? "job_seeker" : "employer",
    };

    if (role === "jobseeker") {
      const nameParts = name.trim().split(" ");
      data.first_name = nameParts[0] || "";
      data.last_name = nameParts.slice(1).join(" ") || "";
    }

    try {
      const res = await axios.post(API_URL, data);

      // Save JWT tokens in localStorage
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user_role", res.data.user.role);

      // Redirect to respective dashboard
      if (res.data.user.role === "job_seeker") navigate("/jobseeker-dashboard");
      else navigate("/employer-dashboard");
    } catch (err) {
      console.error(err.response?.data);
      const errors = err.response?.data;
      let msg = "Signup failed";
      if (errors) {
        if (errors.detail) msg = errors.detail;
        else msg = Object.values(errors).flat().join(" ");
      }
      setError(msg);
    }
  };

  const handleLogin = () => navigate("/login");

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Signup as <span className="text-indigo-600">{role}</span>
          </h2>
          <form onSubmit={handleSignup} className="space-y-5">
            {role === "jobseeker" && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Signup
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <button
              onClick={handleLogin}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
