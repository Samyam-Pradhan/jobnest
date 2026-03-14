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
        <div className="flex-1 flex items-center justify-center p-6">
          
          {/* Main Container - Increased height with min-h-[650px] */}
          <div className="flex flex-col md:flex-row max-w-6xl w-full min-h-[650px] bg-white rounded-3xl shadow-xl overflow-hidden">
            
            {/* Left: Signup Form - White Background */}
            <div className="w-full md:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center border-r border-gray-200">
              <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Signup as <span className="capitalize font-semibold text-indigo-600">{role}</span>
                </p>

                <form onSubmit={handleSignup} className="space-y-4">
                  {role === "jobseeker" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
                  >
                    Sign Up
                  </button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-6">
                  Already have an account?{" "}
                  <button
                    onClick={handleLogin}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>

            {/* Right: Image Container with Light Blue Background (#F3F9FF) */}
            <div 
              className="w-full md:w-1/2 p-8 flex items-center justify-center"
              style={{ backgroundColor: '#F3F9FF' }}
            >
              <img
                src={loginImage}
                alt="Signup Illustration"
                className="w-full max-w-lg object-contain"
              />
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;