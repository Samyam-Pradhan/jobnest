import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostJob from "./PostJob";
import EmployerProfile from "./EmployerProfile";
import MyJobs from "./MyJobs";
import axios from "axios";
import {
  CiLogout,
  CiUser,
  CiViewBoard,
  CiCirclePlus,
  CiFolderOn,
  CiFileOn,
  CiSettings,
  CiCalendar,
  CiMail,
} from "react-icons/ci";

function EmployerDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [companyName, setCompanyName] = useState("");
  const [postedJobs, setPostedJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("profile/employer");
        setCompanyName(res.data.company_name);
        setRecentActivity(res.data.recent_activity || []);
      } catch (err) {
        console.error("Failed to fetch employer profile:", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const res = await api.get("employer/jobs/list/");
        setPostedJobs(res.data.length);
      } catch (err) {
        console.error("Failed to fetch posted jobs:", err);
      }
    };

    fetchPostedJobs();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      setApplicationsLoading(true);

      try {
        const res = await api.get("employer/applications/");
        setApplications(res.data);
        setTotalApplications(res.data.length);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setApplicationsLoading(false);
      }
    };

    if (activeSection === "applications") {
      fetchApplications();
    }
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const statusColors = {
    applied: "bg-blue-100 text-blue-600",
    shortlisted: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
  };

  const sidebarItems = [
    {
      section: "dashboard",
      label: "Overview",
      icon: <CiViewBoard className="inline mr-2 text-xl" />,
    },
    {
      section: "profile",
      label: "Profile",
      icon: <CiUser className="inline mr-2 text-xl" />,
    },
    {
      section: "postJob",
      label: "Post Job",
      icon: <CiCirclePlus className="inline mr-2 text-xl" />,
    },
    {
      section: "myJobs",
      label: "My Jobs",
      icon: <CiFolderOn className="inline mr-2 text-xl" />,
    },
    {
      section: "applications",
      label: "Applications",
      icon: <CiFileOn className="inline mr-2 text-xl" />,
    },
    {
      section: "settings",
      label: "Settings",
      icon: <CiSettings className="inline mr-2 text-xl" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-1 gap-6 p-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border border-gray-200 p-6 flex flex-col rounded-xl h-fit">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Dashboard</h2>

          {sidebarItems.map(({ section, label, icon }) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full px-4 py-2 mb-2 rounded-lg transition-colors flex items-center ${
                activeSection === section
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-auto text-red-500 hover:bg-red-50 rounded-lg flex items-center transition-colors"
          >
            <CiLogout className="inline mr-2 text-xl" />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">

          {activeSection === "dashboard" && (
            <div className="space-y-6">

              <div className="bg-[#8624F9] text-white p-6 rounded-xl shadow">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome, {companyName}
                </h1>
                <p className="text-lg">
                  Here's what's happening with your job posting today.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Quick Actions
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                  <button
                    onClick={() => setActiveSection("postJob")}
                    className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-center"
                  >
                    <CiCirclePlus className="text-3xl text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">
                      Post Job
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveSection("applications")}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center"
                  >
                    <CiFileOn className="text-3xl text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">
                      Review Apps
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveSection("interviews")}
                    className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center"
                  >
                    <CiCalendar className="text-3xl text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">
                      Schedule
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveSection("messages")}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center"
                  >
                    <CiMail className="text-3xl text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">
                      Messages
                    </p>
                  </button>

                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                  <CiCirclePlus className="text-3xl text-indigo-600 mb-2" />
                  <h3 className="text-2xl font-bold">{postedJobs}</h3>
                  <p className="text-gray-500">Posted Jobs</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                  <CiFileOn className="text-3xl text-indigo-600 mb-2" />
                  <h3 className="text-2xl font-bold">{totalApplications}</h3>
                  <p className="text-gray-500">Total Applications</p>
                </div>

              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Recent Activity
                </h2>

                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {recentActivity.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

              </div>
            </div>
          )}

          {activeSection === "profile" && <EmployerProfile />}
          {activeSection === "postJob" && <PostJob />}
          {activeSection === "myJobs" && <MyJobs />}

          {activeSection === "applications" && (
            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-2xl font-bold text-indigo-600 mb-6">
                Applications
              </h2>

              {applicationsLoading ? (
                <p className="text-gray-500">Loading applications...</p>
              ) : applications.length === 0 ? (
                <p className="text-gray-400">
                  No applications received yet.
                </p>
              ) : (
                <div className="space-y-4">

                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="border border-gray-100 rounded-lg p-5 flex justify-between items-center hover:shadow-md transition"
                    >

                      <div>
                        <p className="font-semibold text-gray-800">
                          {app.applicant_name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {app.applicant_email}
                        </p>

                        <p className="text-xs text-indigo-500 mt-1">
                          Applied for:
                          <span className="font-medium">
                            {" "}
                            {app.job.title}
                          </span>
                        </p>

                        <p className="text-xs text-gray-400">
                          {new Date(app.applied_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">

                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            statusColors[app.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {app.status}
                        </span>

                        {app.cv ? (
                          <a
                            href={app.cv}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-indigo-600 hover:underline"
                          >
                            View CV
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No CV
                          </span>
                        )}

                      </div>

                    </div>
                  ))}

                </div>
              )}
            </div>
          )}

          {activeSection === "settings" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Settings
              </h2>
              <p className="text-gray-600">
                This section allows you to configure your account
                and preferences.
              </p>
            </div>
          )}

          {activeSection === "interviews" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Interviews
              </h2>
              <p className="text-gray-600">
                Schedule and manage interviews here.
              </p>
            </div>
          )}

          {activeSection === "messages" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Messages
              </h2>
              <p className="text-gray-600">
                Check your messages from applicants here.
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