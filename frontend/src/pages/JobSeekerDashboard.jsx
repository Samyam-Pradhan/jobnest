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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Middle Section: Sidebar + Main */}
      <div className="flex flex-1 min-h-[calc(100vh-64px)] p-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md border border-gray-200 p-6 flex flex-col rounded-xl">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Dashboard</h2>
          <button
            onClick={() => setActiveSection("profile")}
            className={`w-full px-3 py-2 rounded-lg mb-2 transition-colors ${
              activeSection === "profile"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection("jobs")}
            className={`w-full px-3 py-2 rounded-lg mb-2 transition-colors ${
              activeSection === "jobs"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Job Listings
          </button>
          <button className="w-full px-3 py-2 rounded-lg mb-2 hover:bg-gray-100">
            Saved Jobs
          </button>
          <button className="w-full px-3 py-2 rounded-lg hover:bg-gray-100">
            Applied Jobs
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50 rounded-xl">
          {activeSection === "profile" ? (
            <JobSeekerProfile />
          ) : (
            <>
              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="max-w-xl mx-auto flex border border-gray-300 rounded-lg overflow-hidden mb-8 shadow-sm"
              >
                <input
                  type="text"
                  placeholder="Search by title, skill or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 focus:outline-none"
                />
                <button className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition">
                  Search
                </button>
              </form>

              {/* Job Listings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Software Engineer",
                    company: "Company XYZ",
                    location: "Kathmandu",
                  },
                  {
                    title: "Frontend Developer",
                    company: "Company ABC",
                    location: "Lalitpur",
                  },
                  {
                    title: "Backend Developer",
                    company: "Company DEF",
                    location: "Bhaktapur",
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-xl mb-2">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                      <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                      Apply
                    </button>
                  </div>
                ))}
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
