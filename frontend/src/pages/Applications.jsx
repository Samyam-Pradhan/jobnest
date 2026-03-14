import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaUsers, FaEye, FaRedoAlt, FaBriefcase } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

const STATUS_CONFIG = {
  applied:     { bg: "#EEF2FF", color: "#3A4EF9",  label: "Applied"     },
  shortlisted: { bg: "#ECFDF5", color: "#059669",  label: "Shortlisted" },
  rejected:    { bg: "#FFF1F2", color: "#E11D48",  label: "Rejected"    },
};

const FILTER_TABS = [
  { key: "all",         label: "All"         },
  { key: "applied",     label: "Applied"     },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "rejected",    label: "Rejected"    },
];

/* ── Single application row ─────────────────────── */
function AppRow({ app }) {
  const cfg      = STATUS_CONFIG[app.status] || { bg: "#F9FAFB", color: "#6B7280", label: app.status };
  const initials = (app.applicant_name || "?")
    .split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="grid grid-cols-[44px_1fr_1fr_auto_auto] items-center gap-4 p-5 border-b border-gray-100 hover:bg-gray-50/50 transition">
      <div className="w-11 h-11 rounded-full bg-linear-to-r from-[#3A4EF9] to-[#2A3ED9] flex items-center justify-center font-bold text-white shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-gray-900">{app.applicant_name}</p>
        <p className="text-xs text-gray-500">{app.applicant_email}</p>
        <p className="text-xs text-gray-400 mt-1">
          Applied {new Date(app.applied_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
      <div className="bg-blue-50/50 rounded-lg p-3">
        <p className="text-xs font-semibold text-[#3A4EF9] uppercase tracking-wider mb-1">Applied for</p>
        <p className="font-semibold text-gray-900 truncate">{app.job?.title || "—"}</p>
        {app.job?.location && (
          <p className="text-xs text-gray-500 mt-1">{app.job.location}</p>
        )}
      </div>
      <span className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap`}
        style={{ background: cfg.bg, color: cfg.color }}>
        {cfg.label}
      </span>
      {app.cv ? (
        <a href={app.cv} target="_blank" rel="noreferrer" 
           className="flex items-center gap-2 text-sm text-[#3A4EF9] font-medium hover:underline whitespace-nowrap">
          <FaEye className="text-xs" />
          View CV
        </a>
      ) : (
        <span className="text-sm text-gray-300 whitespace-nowrap">No CV</span>
      )}
    </div>
  );
}
export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState("all");

  const statusCounts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const filtered = filter === "all"
    ? applications
    : applications.filter(a => a.status === filter);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("employer/applications/", { headers: getAuthHeaders() });
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A4EF9] mx-auto mb-4"></div>
        <p className="text-gray-500">Loading applications…</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-linear-to-r from-[#3A4EF9] to-[#2A3ED9] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaUsers /> Applications
            </h2>
            <p className="text-blue-100 mt-1">
              {applications.length} total application{applications.length !== 1 ? "s" : ""} across all your jobs
            </p>
          </div>
          <button 
            onClick={fetchApplications}
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/20 transition"
          >
            <FaRedoAlt className="text-xs" /> Refresh
          </button>
        </div>
      </div>

      {applications.length > 0 && (
        <>
          <div className="flex gap-2 p-6 border-b border-gray-100 overflow-x-auto">
            {FILTER_TABS.map(({ key, label }) => {
              const count = key === "all" ? applications.length : (statusCounts[key] || 0);
              const active = filter === key;
              return (
                <button 
                  key={key} 
                  onClick={() => setFilter(key)} 
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                    active 
                      ? "bg-[#EEF2FF] text-[#3A4EF9] border-2 border-[#3A4EF9]" 
                      : "bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {label}
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    active ? "bg-[#3A4EF9] text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-[44px_1fr_1fr_auto_auto] items-center gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div></div>
            <span>Applicant</span>
            <span>Job Applied For</span>
            <span>Status /</span>
            <span>CV</span>
          </div>
        </>
      )}
      {applications.length === 0 ? (
        <div className="py-16 px-8 text-center">
          <CiFileOn className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No applications yet</h3>
          <p className="text-gray-500">Applications will appear here once job seekers apply to your listings.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 px-8 text-center">
          <p className="text-gray-500">No applications with this status.</p>
        </div>
      ) : (
        <div>
          {filtered.map(app => <AppRow key={app.id} app={app} />)}
        </div>
      )}
    </div>
  );
}