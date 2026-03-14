import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobSeekerProfile from "./JobSeekerProfile";
import SavedJobs from "./Savedjobs"; // Import the SavedJobs component
import { 
  CiUser, 
  CiCircleList, 
  CiSaveDown2, 
  CiCircleCheck, 
  CiLogout, 
  CiSearch, 
  CiViewBoard 
} from "react-icons/ci";

/* ── Scaled Up Job Card (3 per row) ──────────────── */
function JobCard({ job, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        background: "#fff", 
        borderRadius: 20, 
        border: "1px solid #F0EFF4",
        padding: "24px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        height: "100%",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)", 
        cursor: "pointer", 
        transition: "all 0.2s ease"
      }}
      onMouseEnter={e => { 
        e.currentTarget.style.transform = "translateY(-4px)"; 
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)"; 
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.transform = "translateY(0)"; 
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; 
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          {job.company_logo ? (
            <img src={job.company_logo} alt={job.company_name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: "cover" }} />
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#9CA3AF", fontSize: 18 }}>
              {job.company_name?.charAt(0)}
            </div>
          )}
          <div style={{ overflow: "hidden" }}>
            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>{job.company_name}</p>
          </div>
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
           <span style={{ padding: "4px 10px", background: "#F9FAFB", borderRadius: 6, fontSize: 11, color: "#6B7280", fontWeight: 600 }}>{job.location || "Remote"}</span>
           <span style={{ padding: "4px 10px", background: "#EEF2FF", borderRadius: 6, fontSize: 11, color: "#4F46E5", fontWeight: 600 }}>Full-time</span>
        </div>
      </div>

      <button style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: "#4F46E5", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
        View Details
      </button>
    </div>
  );
}

export default function JobSeekerDashboard() {
  const [activeSection, setActiveSection] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      if (activeSection === "jobs") {
        setLoading(true);
        try {
          const res = await api.get("jobs/");
          setJobs(res.data);
        } catch (err) { 
          console.error(err); 
        } finally { 
          setLoading(false); 
        }
      }
    };
    fetchJobs();
  }, [activeSection]);

  const handleLogout = () => { 
    localStorage.clear(); 
    window.location.href = "/login"; 
  };

  const NAV_ITEMS = [
    { id: "jobs", label: "Find Jobs", Icon: CiCircleList },
    { id: "profile", label: "My Profile", Icon: CiUser },
    { id: "saved", label: "Saved Jobs", Icon: CiSaveDown2 },
    { id: "applied", label: "Applied", Icon: CiCircleCheck },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F7F7FB", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      <div style={{ display: "flex", gap: 28, padding: "32px 40px", flex: 1, maxWidth: 1600, margin: "0 auto", width: "100%" }}>
        <aside style={{ width: 260, flexShrink: 0, background: "#fff", borderRadius: 24, border: "1px solid #F0EFF4", padding: "32px 16px", display: "flex", flexDirection: "column", height: "fit-content", position: "sticky", top: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 12px", marginBottom: 32 }}>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#111827", letterSpacing: "-0.02em" }}>JobSeeker Dashboard</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setActiveSection(id)} style={{
                width: "100%", padding: "14px 16px", borderRadius: 14, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                background: activeSection === id ? "#EEF2FF" : "transparent",
                color: activeSection === id ? "#4F46E5" : "#6B7280",
                fontWeight: activeSection === id ? 600 : 500, fontSize: 15,
              }}>
                <Icon style={{ fontSize: 22 }} />
                {label}
              </button>
            ))}
          </div>

          <div style={{ height: "1px", background: "#F3F4F6", margin: "24px 12px 12px 12px" }} />

          <button onClick={handleLogout} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, background: "transparent", color: "#EF4444", fontSize: 15, fontWeight: 600 }}>
            <CiLogout style={{ fontSize: 22 }} /> Logout
          </button>
        </aside>
        
        <main style={{ flex: 1, minWidth: 0 }}>
          
          {activeSection === "jobs" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center",
                  background: "#fff", 
                  borderRadius: 100, 
                  padding: "6px 8px", 
                  width: "100%", 
                  maxWidth: "650px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}>
                   <CiSearch style={{ fontSize: 22, color: "#9CA3AF", marginLeft: 16 }} />
                   <input 
                    type="text" 
                    placeholder="Search jobs, skills, or companies..." 
                    style={{ flex: 1, border: "none", padding: "12px", outline: "none", fontSize: 14, color: "#111827" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                   />
                   <button style={{ background: "#4F46E5", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 100, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                    Search
                   </button>
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: "60px", color: "#9CA3AF" }}>Loading...</div>
              ) : (
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(3, 1fr)", 
                  gap: "20px",
                  width: "100%" 
                }}>
                  {jobs.map(job => (
                    <JobCard key={job.id} job={job} onClick={() => navigate(`/jobs/${job.id}`)} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "profile" && <JobSeekerProfile />}

          {activeSection === "saved" && <SavedJobs />}

          {activeSection === "applied" && (
            <div style={{ textAlign: "center", padding: "60px", color: "#9CA3AF" }}>
              <CiCircleCheck style={{ fontSize: 48, marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Applied Jobs Coming Soon</h3>
              <p>This feature is currently under development.</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}