import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) return <p>Loading jobs...</p>;

  if (!jobs.length) return <p>No jobs posted yet.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">My Posted Jobs</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded hover:shadow-md transition">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Job Level:</strong> {job.job_level}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Work Type:</strong> {job.work_type}</p>
            <p><strong>Posted At:</strong> {new Date(job.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyJobs;
