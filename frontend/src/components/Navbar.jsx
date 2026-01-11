import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); 
  };

  return (
    <nav className="bg-white border-b border-gray-300 p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        JobNest
      </Link>
      <div className="flex gap-3">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-5 py-2.5 border-2 border-black rounded-full text-black hover:bg-gray-100 transition"
            >
              Login
            </Link>

            {/* Signup Button */}
            <Link
              to="/signup"
              className="px-5 py-2.5 border-2 border-blue-300 rounded-full bg-blue-200 text-blue-800 hover:bg-blue-300 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 border-2 border-red-500 rounded-full bg-red-200 text-red-800 hover:bg-red-300 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
