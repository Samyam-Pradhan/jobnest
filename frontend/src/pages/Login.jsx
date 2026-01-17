import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border px-4 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border px-4 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <button
              onClick={handleSignup}
              className="text-blue-600 hover:underline"
            >
              Signup
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
