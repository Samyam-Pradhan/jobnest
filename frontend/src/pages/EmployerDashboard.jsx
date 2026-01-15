import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EmployerDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");
  const companyName = localStorage.getItem("company_name");
  const email = localStorage.getItem("email");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("employer/jobs/");
        setJobs(res.data);
      } catch (err) {
        console.log("No jobs yet or endpoint not ready");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === "myJobs") fetchJobs();
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-1 gap-6 p-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border border-gray-200 p-6 flex flex-col rounded-xl h-fit">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Dashboard</h2>
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`w-full px-4 py-2 mb-2 rounded-lg transition-colors ${
              activeSection === "dashboard"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("postJob")}
            className={`w-full px-4 py-2 mb-2 rounded-lg transition-colors ${
              activeSection === "postJob"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Post Job
          </button>
          <button
            onClick={() => setActiveSection("myJobs")}
            className={`w-full px-4 py-2 mb-2 rounded-lg transition-colors ${
              activeSection === "myJobs"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            My Jobs
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-auto text-red-500 hover:bg-red-50 rounded-lg"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Welcome Card */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h1 className="text-2xl font-bold text-indigo-600 mb-2">
                  Welcome, {companyName || "Employer"}
                </h1>
                <p className="text-gray-600 mb-4">{email}</p>
                <p className="text-gray-700">
                  You can post new jobs, manage existing ones, and track applications.
                </p>
              </div>

              {/* Stats Card */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-4">Stats</h2>
                <div className="flex justify-between">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-600">{jobs.length}</p>
                    <p className="text-gray-500">Jobs Posted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">0</p>
                    <p className="text-gray-500">Applications</p>
                  </div>
                </div>
              </div>

              {/* Quick Action */}
              <div
                onClick={() => setActiveSection("postJob")}
                className="cursor-pointer bg-indigo-50 p-6 rounded-xl shadow hover:shadow-lg transition flex items-center justify-center font-semibold text-indigo-700"
              >
                + Post a New Job
              </div>
            </div>
          )}

          {/* Post Job */}
          {activeSection === "postJob" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
              <form className="grid grid-cols-1 gap-4 max-w-lg">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border p-2 rounded"
                />
                <select className="w-full border p-2 rounded">
                  <option value="">Job Level</option>
                  <option value="intern">Intern</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                </select>
                <textarea
                  placeholder="Job Description"
                  className="w-full border p-2 rounded"
                  rows={5}
                />
                <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                  Post Job
                </button>
              </form>
            </div>
          )}

          {/* My Jobs */}
          {activeSection === "myJobs" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">My Posted Jobs</h2>
              {loading ? (
                <p>Loading jobs...</p>
              ) : jobs.length === 0 ? (
                <p>You haven’t posted any jobs yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left p-3">Title</th>
                        <th className="text-left p-3">Location</th>
                        <th className="text-left p-3">Level</th>
                        <th className="text-left p-3">Posted On</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{job.title}</td>
                          <td className="p-3">{job.location}</td>
                          <td className="p-3">{job.job_level}</td>
                          <td className="p-3">{new Date(job.created_at).toLocaleDateString()}</td>
                          <td className="p-3 space-x-2">
                            <button className="text-blue-600 hover:underline">View</button>
                            <button className="text-green-600 hover:underline">Edit</button>
                            <button className="text-red-600 hover:underline">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default EmployerDashboard;
