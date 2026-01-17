import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobSeekerProfile from "./JobSeekerProfile";

function JobSeekerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("jobs/"); // Jobseeker endpoint
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === "jobs") fetchJobs();
  }, [activeSection]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Optional: Implement search filtering later
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
              {loading ? (
                <p>Loading jobs...</p>
              ) : !jobs.length ? (
                <p>No jobs available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between cursor-pointer"
                      onClick={() => console.log("View job details:", job.id)}
                    >
                      <div className="flex items-center mb-4">
                        {job.logo ? (
                          <img
                            src={job.logo}
                            alt={job.company_name}
                            className="w-12 h-12 rounded-full mr-3 object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-gray-600">
                           <img src={job.company_logo} alt={job.company_name} />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-lg">{job.company_name}</h3>
                          <p className="text-gray-600">{job.location}</p>
                        </div>
                      </div>
                      <h4 className="font-semibold text-indigo-600">{job.title}</h4>
                      <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default JobSeekerDashboard;
