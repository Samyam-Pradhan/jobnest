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
        // 1️⃣ Fetch job details
        const jobRes = await api.get(`jobs/${id}/`);
        setJob(jobRes.data);

        // 2️⃣ Fetch saved jobs & check if this job is saved
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

  if (loading) return <p className="p-10">Loading...</p>;
  if (!job) return <p className="p-10">Job not found</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg mt-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          {job.company_logo ? (
            <img
              src={job.company_logo}
              alt={job.company_name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
              No Logo
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold text-indigo-600">{job.title}</h1>
            <p className="text-gray-600">{job.company_name}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        </div>

        {/* Job Info */}
        <div className="space-y-4">
          <p><strong>Job Level:</strong> {job.job_level}</p>
          <p><strong>Experience Required:</strong> {job.experience}</p>
          <p><strong>Work Type:</strong> {job.work_type}</p>

          <div>
            <h2 className="font-semibold text-lg mt-6 mb-2">
              Job Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mt-6 mb-2">
              Responsibilities
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {job.responsibilities}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
            Apply Now
          </button>

          <button
            onClick={toggleSaveJob}
            disabled={saving}
            className={`px-6 py-2 rounded text-white transition ${
              saved
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {saving ? "Saving..." : saved ? "Saved" : "Save Job"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default JobDetails;
