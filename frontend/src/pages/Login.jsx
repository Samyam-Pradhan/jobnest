import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import homeimage from "../assets/home.jpg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/login/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(API_URL, { email, password });
      console.log(res.data.user);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user_role", res.data.user.role);
      localStorage.setItem("name", res.data.user.first_name + " " + res.data.user.last_name);

      if (res.data.user.role === "job_seeker") navigate("/jobseeker-dashboard");
      else navigate("/employer-dashboard");
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data.detail || "Login failed");
    }
  };

  const handleSignup = () => navigate("/signup");

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center p-6">
          
          {/* Main Container - Increased height with min-h-[650px] */}
          <div className="flex flex-col md:flex-row max-w-6xl w-full min-h-162.5 bg-white rounded-3xl shadow-xl overflow-hidden relative">
            
            {/* Left - Image Container with White Background */}
            <div className="md:w-1/2 bg-white p-8 flex items-center justify-center relative overflow-hidden">
              <img
                src={homeimage}
                alt="login"
                className="w-full max-w-md object-contain relative z-10"
              />
            </div>

            {/* Right - Login Form with Light Blue Background (#F3F9FF) */}
            <div 
              className="md:w-1/2 p-8 lg:p-12 relative overflow-hidden"
              style={{ backgroundColor: '#F3F9FF' }}
            >
              {/* Content with relative positioning */}
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 mb-8">
                  Please login to your account
                </p>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
                  >
                    Login
                  </button>

                  <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={handleSignup}
                      className="text-blue-600 font-semibold hover:underline"
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