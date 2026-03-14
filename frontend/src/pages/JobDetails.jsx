import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRes = await api.get(`jobs/${id}/`);
        setJob(jobRes.data);

        const savedRes = await api.get("saved-jobs/");
        const isSaved = savedRes.data.some(
          (item) =>
            item.id === jobRes.data.id || item.job?.id === jobRes.data.id
        );
        setSaved(isSaved);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const toggleSaveJob = async () => {
    setSaving(true);
    try {
      await api.post(`saved-jobs/toggle/${id}/`);
      setSaved((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle save job", err);
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async () => {
    setApplying(true);
    setApplyMessage("");
    try {
      await api.post(`jobs/${id}/apply/`);
      setApplied(true);
      setApplyMessage("Application submitted successfully!");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to apply.";
      setApplyMessage(msg);
      if (msg.includes("already applied")) setApplied(true);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <p className="text-gray-500">Loading job details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
            <p className="text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-[#3A4EF9] transition-colors mb-6 group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section with Company Info */}
          <div className="relative h-48 bg-[#3A4EF9]">
            <div className="absolute -bottom-12 left-8 flex items-end">
              <div className="bg-white p-2 rounded-2xl shadow-lg">
                {job.company_logo ? (
                  <img
                    src={job.company_logo}
                    alt={job.company_name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-[#3A4EF9] rounded-xl flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {job.company_name?.charAt(0) || 'C'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Title and Basic Info */}
          <div className="pt-16 px-8 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-lg text-gray-600">{job.company_name}</p>
                <span className="text-gray-300">•</span>
                <p className="text-gray-600">{job.location}</p>
              </div>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="px-8 pb-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Job Level</p>
                <p className="font-semibold text-gray-900">{job.job_level}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Experience</p>
                <p className="font-semibold text-gray-900">{job.experience}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Work Type</p>
                <p className="font-semibold text-gray-900">{job.work_type}</p>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#3A4EF9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Job Description
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl text-gray-700 whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#3A4EF9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Responsibilities
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl text-gray-700 whitespace-pre-line">
                {job.responsibilities}
              </div>
            </div>

            {/* Apply feedback message */}
            {applyMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                applied ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}>
                <p className="flex items-center gap-2">
                  {applied ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {applyMessage}
                </p>
              </div>
            )}

            {/* Action Buttons at Bottom */}
            <div className="flex gap-3 pt-6 border-t border-gray-100">
              <button
                onClick={handleApply}
                disabled={applied || applying}
                className={`px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  applied
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-[#3A4EF9] text-white hover:bg-[#2A3ED9] shadow-lg hover:shadow-xl"
                }`}
              >
                {applying ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Applying...
                  </span>
                ) : applied ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Applied ✓
                  </span>
                ) : (
                  "Apply Now"
                )}
              </button>

              <button
                onClick={toggleSaveJob}
                disabled={saving}
                className={`px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 border-2 ${
                  saved
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                }`}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : saved ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    Saved
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save Job
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default JobDetails;