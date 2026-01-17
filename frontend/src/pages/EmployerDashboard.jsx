import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostJob from "./PostJob";
import EmployerProfile from "./EmployerProfile";
import MyJobs from "./MyJobs";
import axios from "axios";

function EmployerDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("access_token");
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/profile/employer/",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("");
        setCompanyName(res.data.company_name || "Employer");
        setEmail(res.data.contact_email || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

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
          {[
            ["dashboard", "Overview"],
            ["profile", "Profile"],
            ["postJob", "Post Job"],
            ["myJobs", "My Jobs"],
            ["applications", "Applications"],
          ].map(([section, label]) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full px-4 py-2 mb-2 rounded-lg transition-colors ${
                activeSection === section
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}

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
            <div className="bg-white p-6 rounded-xl shadow">
              <h1 className="text-2xl font-bold text-indigo-600 mb-2">
                Welcome, {companyName}
              </h1>
              <p className="text-gray-600 mb-4">{email}</p>
              <p className="text-gray-700">
                You can post new jobs, manage existing ones, and track applications.
              </p>
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
