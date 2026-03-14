import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import homeimage from "../assets/home.jpg";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000/api/login/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { email, password });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user_role", res.data.user.role);
      localStorage.setItem("name", res.data.user.first_name + " " + res.data.user.last_name);

      if (res.data.user.role === "job_seeker") navigate("/jobseeker-dashboard");
      else navigate("/employer-dashboard");
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => navigate("/signup");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex items-center justify-center p-8 min-h-[calc(100vh-200px)]">
          
          {/* Main Container - Increased size */}
          <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Left - Image Container (White) */}
            <div className="md:w-1/2 bg-white p-12 flex items-center justify-center">
              <img
                src={homeimage}
                alt="login"
                className="w-full max-w-md object-contain"
              />
            </div>

            {/* Right - Login Form (Blue) */}
            <div className="md:w-1/2 bg-gradient-to-br from-[#3A4EF9] to-[#2A3ED9] p-12 lg:p-16 flex items-center">
              <div className="w-full max-w-md mx-auto text-white">
                <h2 className="text-4xl font-bold mb-3">
                  Welcome Back
                </h2>
                <p className="text-blue-100 text-lg mb-10">
                  Please login to your account
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-5 py-4 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition text-gray-900 placeholder-gray-400 text-base"
                        placeholder="Enter your email"
                        required
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-5 py-4 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition text-gray-900 placeholder-gray-400 text-base"
                        placeholder="Enter your password"
                        required
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
                    className="w-full bg-white text-[#3A4EF9] py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#3A4EF9]"></div>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  <p className="text-center text-blue-100 mt-6">
                    Don't have an account?{" "}
                    <button
                      onClick={handleSignup}
                      className="text-white font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;