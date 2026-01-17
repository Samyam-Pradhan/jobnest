import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import homeimage from "../assets/home.jpg"; // make sure path is correct

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
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user_role", res.data.user.role);

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
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex flex-col md:flex-row flex-1 items-center justify-center">

          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <img
              src={homeimage}
              alt="homeimg"
              className="w-full max-w-lg object-contain"
            />
          </div>

          {/* Right: Login Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md">
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Login
              </h2>
              <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </form>
              <p className="mt-6 text-center text-gray-500">
                Don't have an account?{" "}
                <button
                  onClick={handleSignup}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Signup
                </button>
              </p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
