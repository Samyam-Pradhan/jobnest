import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/jobs/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJob(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

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
          <p>
            <strong>Job Level:</strong> {job.job_level}
          </p>
          <p>
            <strong>Experience Required:</strong> {job.experience}
          </p>
          <p>
            <strong>Work Type:</strong> {job.work_type}
          </p>

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

        <button className="mt-8 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          Apply Now
        </button>
      </div>

      <Footer />
    </>
  );
}

export default JobDetails;
