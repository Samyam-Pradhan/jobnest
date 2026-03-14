import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loginImage from "../assets/login.jpg";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // role set from Home page

  const [name, setName] = useState(""); // only for Job Seeker
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000/api/register/";

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => navigate("/login");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex items-center justify-center p-8 min-h-[calc(100vh-200px)]">
          
          {/* Main Container - Same size as Login */}
          <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Left - Signup Form (Blue) */}
            <div className="md:w-1/2 bg-gradient-to-br from-[#3A4EF9] to-[#2A3ED9] p-12 lg:p-16 flex items-center order-2 md:order-1">
              <div className="w-full max-w-md mx-auto text-white">
                <h2 className="text-4xl font-bold mb-3">
                  Create Account
                </h2>
                <p className="text-blue-100 text-lg mb-2">
                  Signup as <span className="font-semibold text-white capitalize">{role}</span>
                </p>
                <p className="text-blue-100 text-sm mb-8">
                  Please fill in your details to get started
                </p>

                <form onSubmit={handleSignup} className="space-y-5">
                  {role === "jobseeker" && (
                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full pl-12 pr-5 py-4 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition text-gray-900 placeholder-gray-400 text-base"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-5 py-4 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition text-gray-900 placeholder-gray-400 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-5 py-4 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition text-gray-900 placeholder-gray-400 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        className="w-full pl-12 pr-5 py-4 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition text-gray-900 placeholder-gray-400 text-base"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/20 text-white p-4 rounded-xl border border-white/30">
                      <p className="flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-[#3A4EF9] py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#3A4EF9]"></div>
                        Creating Account...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>

                <p className="text-center text-blue-100 mt-6">
                  Already have an account?{" "}
                  <button
                    onClick={handleLogin}
                    className="text-white font-semibold hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>

            {/* Right - Image Container (White) */}
            <div className="md:w-1/2 bg-white p-12 flex items-center justify-center order-1 md:order-2">
              <img
                src={loginImage}
                alt="Signup Illustration"
                className="w-full max-w-md object-contain"
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