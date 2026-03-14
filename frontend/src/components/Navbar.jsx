import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiBellOn, CiUser, CiLogout } from "react-icons/ci";
import { FaBriefcase } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn]   = useState(!!localStorage.getItem("access_token"));
  const [username, setUsername]       = useState(localStorage.getItem("name") || "User");
  const [role, setRole]               = useState(localStorage.getItem("user_role") || "");
  const [scrolled, setScrolled]       = useState(false);

  const dashboardPath =
    role === "job_seeker" ? "/jobseeker-dashboard" : "/employer-dashboard";

  const profilePath =
    role === "job_seeker" ? "/jobseeker-profile" : "/employer-profile";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
      setUsername(localStorage.getItem("name") || "User");
      setRole(localStorage.getItem("user_role") || "");
    };
    window.addEventListener("storage", syncAuth);
    window.addEventListener("focus", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("focus", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername("User");
    setRole("");
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-gray-200" : "border-b border-transparent"
      }`}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo with Briefcase Icon */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-r from-[#3A4EF9] to-[#2A3ED9] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition">
            <FaBriefcase className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Job<span className="text-[#3A4EF9]">Nest</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">

          {!isLoggedIn ? (
            /* ── Logged out ── */
            <>
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                Home
              </Link>
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-5 py-2 bg-[#3A4EF9] text-white rounded-lg text-sm font-medium hover:bg-[#2A3ED9] transition shadow-sm"
              >
                Sign Up
              </Link>
            </>
          ) : (
            /* ── Logged in ── */
            <div className="flex items-center gap-2">

              {/* Dashboard link */}
              <Link
                to={dashboardPath}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>

              {/* Profile link */}
              <Link
                to={profilePath}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition flex items-center gap-1"
              >
                <CiUser className="text-lg" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              {/* Notifications bell */}
              <button
                className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                title="Notifications"
              >
                <CiBellOn className="text-xl text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* User info */}
              <div className="hidden md:block text-sm text-gray-700 font-medium px-2">
                {username.split(' ')[0]}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition flex items-center gap-1"
              >
                <CiLogout className="text-lg" />
                <span className="hidden sm:inline">Logout</span>
              </button>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;