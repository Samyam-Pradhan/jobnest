import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const [username, setUsername] = useState(
    localStorage.getItem("name") || "User"
  );
  const [scrolled, setScrolled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
      setUsername(localStorage.getItem("first_name") || "User");
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
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-sm border-b border-black/5" : "border-b border-transparent"
      }`}
      style={{ backgroundColor: "#FEFEFF" }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5">
          <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="38" height="38" rx="10" fill="#3A4EF9" />
            <rect x="9" y="16" width="20" height="14" rx="2.5" fill="white" fillOpacity="0.95" />
            <path d="M15 16v-2a2 2 0 012-2h4a2 2 0 012 2v2" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <rect x="9" y="21" width="20" height="2" fill="#3A4EF9" fillOpacity="0.4" />
            <rect x="17.5" y="19.5" width="3" height="3" rx="1" fill="#3A4EF9" />
          </svg>
          <span className="text-lg font-extrabold tracking-tight" style={{ color: "#3A4EF9" }}>
            JobNest
          </span>
        </Link>

        {/* Nav Links + Actions */}
        <div className="flex items-center">
          {!isLoggedIn ? (
            <>
              <Link to="/" className="px-2.5 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100">
                Home
              </Link>
              <Link to="/login" className="px-2.5 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100">
                Login
              </Link>
              <div className="w-px h-4 bg-gray-200 mx-1" />
              <Link to="/signup" className="px-2.5 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">

              {/* User icon — light background, tooltip on hover */}
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: "#E8EBFE" }}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="#3A4EF9"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>

                {/* Tooltip */}
                {showTooltip && (
                  <div
                    className="absolute top-full left-1/2 mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-lg whitespace-nowrap pointer-events-none z-50"
                    style={{
                      backgroundColor: "#3A4EF9",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {username}
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                      style={{ borderBottomColor: "#3A4EF9" }}
                    />
                  </div>
                )}
              </div>

              {/* Logout button - red */}
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: "#EF4444" }}
                onMouseEnter={e => e.target.style.backgroundColor = "#DC2626"}
                onMouseLeave={e => e.target.style.backgroundColor = "#EF4444"}
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;