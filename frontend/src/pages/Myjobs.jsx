import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiLocationOn, CiCalendar, CiBag1 , CiTimer } from "react-icons/ci";

function MyJobs() {
  const token = localStorage.getItem("access_token");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("employer/jobs/list/");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-8">Loading jobs...</p>;

  if (!jobs.length)
    return <p className="text-center text-gray-500 mt-8">No jobs posted yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <h2 className="text-3xl font-bold text-indigo-600">My Posted Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            </div>

            <div className="mt-4 space-y-2 text-gray-600 text-sm">
              <p className="flex items-center">
                <CiLocationOn className="mr-2 text-gray-400" /> {job.location}
              </p>
              <p className="flex items-center">
                <CiBag1 className="mr-2 text-gray-400" /> {job.job_level}
              </p>
              <p className="flex items-center">
                <CiTimer className="mr-2 text-gray-400" /> {job.experience} experience
              </p>
              <p className="flex items-center">
                <CiCalendar className="mr-2 text-gray-400" /> {job.work_type}
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Posted on: {new Date(job.created_at).toLocaleString()}
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJobs;
