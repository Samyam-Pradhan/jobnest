import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { 
  FaUsers, 
  FaFileAlt, 
  FaCheckCircle, 
  FaTimesCircle,
  FaClock,
  FaEye,
  FaDownload,
  FaFilter,
  FaRedoAlt
} from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

const STATUS_CONFIG = {
  applied:     { bg: "#EEF2FF", color: "#3A4EF9", label: "Applied" },
  shortlisted: { bg: "#ECFDF5", color: "#059669", label: "Shortlisted" },
  rejected:    { bg: "#FFF1F2", color: "#E11D48", label: "Rejected" },
};

function AppRow({ app }) {
  const cfg = STATUS_CONFIG[app.status] || { bg: "#F9FAFB", color: "#6B7280", label: app.status };
  const initials = (app.applicant_name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition px-2 rounded-lg">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3A4EF9] to-[#2A3ED9] flex items-center justify-center font-bold text-white flex-shrink-0">
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">
          {app.applicant_name}
        </p>
        <p className="text-sm text-gray-500">
          {app.applicant_email}
        </p>
        <p className="text-sm text-[#3A4EF9] font-medium mt-1">
          {app.job?.title}
        </p>
      </div>

      {/* Date */}
      <span className="text-sm text-gray-500 flex-shrink-0 hidden md:block">
        {new Date(app.applied_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>

      {/* Status badge */}
      <span
        className="text-xs font-semibold px-4 py-2 rounded-full flex-shrink-0"
        style={{
          background: cfg.bg,
          color: cfg.color,
        }}
      >
        {cfg.label}
      </span>

      {/* CV link */}
      {app.cv ? (
        <a
          href={app.cv}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-[#3A4EF9] font-medium flex items-center gap-1 flex-shrink-0 hover:underline"
        >
          <FaEye className="text-xs" />
          View CV
        </a>
      ) : (
        <span className="text-sm text-gray-400 flex-shrink-0">No CV</span>
      )}
    </div>
  );
}

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const statusCounts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const filteredApplications = filter === "all" 
    ? applications 
    : applications.filter(app => app.status === filter);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("employer/applications/", {
        headers: getAuthHeaders(),
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A4EF9]"></div>
          <p className="text-gray-500">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3A4EF9] to-[#2A3ED9] px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaUsers className="text-2xl" />
          Applications
        </h2>
        <p className="text-blue-100 mt-1">Review and manage job applications</p>
      </div>
      {/* Filter Bar */}
      {applications.length > 0 && (
        <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaFilter className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {filter === "all" ? "Showing all applications" : `Showing ${STATUS_CONFIG[filter]?.label} applications`}
            </span>
          </div>
          <button
            onClick={fetchApplications}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#3A4EF9] transition px-3 py-1 rounded-lg hover:bg-blue-50"
          >
            <FaRedoAlt className="text-xs" />
            Refresh
          </button>
        </div>
      )}

      {/* Content */}
      {applications.length === 0 ? (
        <div className="p-16 text-center">
          <CiFileOn className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No applications yet</h3>
          <p className="text-gray-500">
            Applications will appear here once job seekers apply to your listings.
          </p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="p-16 text-center">
          <p className="text-gray-500">No applications with this status.</p>
        </div>
      ) : (
        <div className="p-6">
          {filteredApplications.map((app) => (
            <AppRow key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}