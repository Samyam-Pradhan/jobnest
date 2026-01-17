import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loginImage from "../assets/login.jpg"; // replace with correct path

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

    // Prepare payload
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
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user_role", res.data.user.role);

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
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex flex-col md:flex-row flex-1 items-center justify-center">

          {/* Left: Signup Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md">
              <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                Signup as <span className="capitalize">{role}</span>
              </h2>

              <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                {role === "jobseeker" && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
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

          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <img
              src={loginImage}
              alt="Signup Illustration"
              className="w-full max-w-lg object-contain"
            />
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
