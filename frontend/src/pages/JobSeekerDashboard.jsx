import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobSeekerProfile from "./JobSeekerProfile";

function JobSeekerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("jobs");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 border-r border-gray-300">
          <h3 className="text-lg font-bold mb-4">My Dashboard</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("profile")}
                className={`w-full text-left px-2 py-1 rounded ${
                  activeSection === "profile"
                    ? "bg-indigo-100 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("jobs")}
                className={`w-full text-left px-2 py-1 rounded ${
                  activeSection === "jobs"
                    ? "bg-indigo-100 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                Job Listings
              </button>
            </li>
            <li>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded">
                Saved Jobs
              </button>
            </li>
            <li>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded">
                Applied Jobs
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 flex flex-col items-center">
          {activeSection === "profile" ? (
            <JobSeekerProfile />
          ) : (
            <>
              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="w-full max-w-lg flex border border-gray-300 rounded overflow-hidden mb-6"
              >
                <input
                  type="text"
                  placeholder="Search by title, skill or organization"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition"
                >
                  Search
                </button>
              </form>

              {/* Job Listings */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded shadow">
                  <h3 className="font-bold text-lg">Software Engineer</h3>
                  <p>Company XYZ</p>
                  <p>Location: Kathmandu</p>
                  <button className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                    Apply
                  </button>
                </div>

                <div className="p-4 bg-white rounded shadow">
                  <h3 className="font-bold text-lg">Frontend Developer</h3>
                  <p>Company ABC</p>
                  <p>Location: Lalitpur</p>
                  <button className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default JobSeekerDashboard;
