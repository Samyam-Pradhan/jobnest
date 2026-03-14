import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostJob from "./PostJob";
import EmployerProfile from "./EmployerProfile";
import MyJobs from "./MyJobs";
import Applications from "./Applications";
import axios from "axios";
import {
  CiLogout, CiUser, CiViewBoard, CiCirclePlus,
  CiFolderOn, CiFileOn, CiSettings, CiCalendar, CiMail,
} from "react-icons/ci";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

const NAV_ITEMS = [
  { section: "dashboard",    label: "Overview",      Icon: CiViewBoard   },
  { section: "profile",      label: "Profile",        Icon: CiUser        },
  { section: "postJob",      label: "Post a Job",     Icon: CiCirclePlus  },
  { section: "myJobs",       label: "My Jobs",        Icon: CiFolderOn    },
  { section: "applications", label: "Applications",   Icon: CiFileOn      },
  { section: "settings",     label: "Settings",       Icon: CiSettings    },
];

/* ── Shared Stat Card ─────────────────────────── */
function StatCard({ label, value, accent, loading }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, border: "1px solid #F0EFF4",
      padding: "22px 24px", display: "flex", flexDirection: "column", gap: 6,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </span>
      {loading 
        ? <div style={{ height: 36, width: 60, borderRadius: 8, background: "#F3F4F6", animation: "pulse 1.4s infinite" }} />
        : <span style={{ fontSize: 32, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</span>
      }
    </div>
  );
}

/* ── Quick Action Tile ────────────────────────── */
function QuickAction({ label, Icon, accent, bg, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: bg, border: "none", borderRadius: 14, padding: "20px 16px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      cursor: "pointer", transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <Icon style={{ fontSize: 22, color: accent }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{label}</span>
    </button>
  );
}

export default function EmployerDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [companyName, setCompanyName] = useState("");
  const [postedJobs, setPostedJobs] = useState(0);
  const [applications, setApplications] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  const statusCounts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const [profileRes, jobsRes, appsRes] = await Promise.all([
        api.get("profile/employer", { headers: getAuthHeaders() }),
        api.get("employer/jobs/list/", { headers: getAuthHeaders() }),
        api.get("employer/applications/", { headers: getAuthHeaders() }),
      ]);
      setCompanyName(profileRes.data.company_name || "");
      setPostedJobs(jobsRes.data.length);
      setApplications(appsRes.data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleLogout = () => { localStorage.clear(); window.location.href = "/login"; };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F7F7FB", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div style={{ display: "flex", gap: 28, padding: "32px 40px", flex: 1, maxWidth: 1600, margin: "0 auto", width: "100%" }}>
        
        {/* Sidebar (Exactly as you wanted - unchanged) */}
        <aside style={{ width: 260, flexShrink: 0, background: "#fff", borderRadius: 24, border: "1px solid #F0EFF4", padding: "32px 16px", display: "flex", flexDirection: "column", height: "fit-content", position: "sticky", top: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 12px", marginBottom: 32 }}>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#111827", letterSpacing: "-0.02em" }}>Employer Dashboard</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map(({ section, label, Icon }) => (
              <button key={section} onClick={() => setActiveSection(section)} style={{
                width: "100%", padding: "14px 16px", borderRadius: 14, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                background: activeSection === section ? "#EEF2FF" : "transparent",
                color: activeSection === section ? "#4F46E5" : "#6B7280",
                fontWeight: activeSection === section ? 600 : 500, fontSize: 15,
              }}>
                <Icon style={{ fontSize: 22 }} />
                {label}
                {section === "applications" && applications.length > 0 && (
                  <span style={{ marginLeft: "auto", background: activeSection === section ? "#4F46E5" : "#EEF2FF", color: activeSection === section ? "#fff" : "#4F46E5", fontSize: 11, fontWeight: 700, borderRadius: 10, padding: "2px 8px" }}>
                    {applications.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div style={{ height: "1px", background: "#F3F4F6", margin: "24px 12px 12px 12px" }} />

          <button onClick={handleLogout} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, background: "transparent", color: "#EF4444", fontSize: 15, fontWeight: 600 }}>
            <CiLogout style={{ fontSize: 22 }} /> Logout
          </button>
        </aside>

        {/* Main Content - Now in a container with blue highlight */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {activeSection === "dashboard" && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header with blue gradient */}
              <div className="bg-gradient-to-r from-[#3A4EF9] to-[#2A3ED9] px-8 py-6">
                <h1 className="text-2xl font-bold text-white">
                  {companyName || "Welcome Back"}
                </h1>
                <p className="text-blue-100 mt-1">Here's what's happening with your recruitment today.</p>
              </div>

              {/* Stats Cards */}
              <div className="p-8">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                  <StatCard label="Posted Jobs" value={postedJobs} accent="#3A4EF9" loading={statsLoading} />
                  <StatCard label="Applications" value={applications.length} accent="#059669" loading={statsLoading} />
                  <StatCard label="Shortlisted" value={statusCounts.shortlisted || 0} accent="#D97706" loading={statsLoading} />
                  <StatCard label="Rejected" value={statusCounts.rejected || 0} accent="#EF4444" loading={statsLoading} />
                </div>

                {/* Quick Actions */}
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid #F0EFF4" }}>
                  <p style={{ margin: "0 0 18px", fontWeight: 700, fontSize: 15, color: "#111827" }}>Quick Actions</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    <QuickAction label="Post a Job" Icon={CiCirclePlus} accent="#3A4EF9" bg="#EEF2FF" onClick={() => setActiveSection("postJob")} />
                    <QuickAction label="Review Apps" Icon={CiFileOn} accent="#059669" bg="#ECFDF5" onClick={() => setActiveSection("applications")} />
                    <QuickAction label="View Jobs" Icon={CiFolderOn} accent="#7C3AED" bg="#F5F3FF" onClick={() => setActiveSection("myJobs")} />
                    <QuickAction label="Edit Profile" Icon={CiUser} accent="#0284C7" bg="#F0F9FF" onClick={() => setActiveSection("profile")} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeSection === "profile" && <EmployerProfile />}
          {activeSection === "postJob" && <PostJob />}
          {activeSection === "myJobs" && <MyJobs />}
          {activeSection === "applications" && <Applications />}
        </main>
      </div>
      <Footer />
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}