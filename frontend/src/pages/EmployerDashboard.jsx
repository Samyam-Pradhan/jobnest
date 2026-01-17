import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostJob from "./Postjob";
import EmployerProfile from "./EmployerProfile";
import MyJobs from "./Myjobs";

function EmployerDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const companyName = localStorage.getItem("company_name");
  const email = localStorage.getItem("email");

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

          {/* Sidebar Buttons */}
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
            onClick={() => setActiveSection("profile")}
            className={`w-full px-4 py-2 mb-2 rounded-lg transition-colors ${
              activeSection === "profile"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Profile
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
            onClick={() => setActiveSection("applications")}
            className={`w-full px-4 py-2 mb-2 rounded-lg transition-colors ${
              activeSection === "applications"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Applications
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
          {activeSection === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h1 className="text-2xl font-bold text-indigo-600 mb-2">
                  Welcome, {companyName || "Employer"}
                </h1>
                <p className="text-gray-600 mb-4">{email}</p>
                <p className="text-gray-700">
                  You can post new jobs, manage existing ones, and track applications.
                </p>
              </div>
            </div>
          )}

          {activeSection === "profile" && <EmployerProfile />}

          {activeSection === "postJob" && <PostJob />}

          {activeSection === "myJobs" && <MyJobs />}


          

          {activeSection === "applications" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Applications</h2>
              <p className="text-gray-600">
                This section will show all applicants who applied to your jobs. Coming soon!
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default EmployerDashboard;
