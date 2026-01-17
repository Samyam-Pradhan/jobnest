import React, { useState } from "react";
import axios from "axios";

function PostJob() {
  const token = localStorage.getItem("access_token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsibilities: "",
    location: "",
    job_level: "",
    experience: "",
    work_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: `Bearer ${token}` },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("employer/jobs/", formData);
      setMessage("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        responsibilities: "",
        location: "",
        job_level: "",
        experience: "",
        work_type: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("Error posting job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Post a New Job</h2>

      {message && (
        <p className={`mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="border p-2 rounded" required />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} className="border p-2 rounded" rows={5} required />
        <textarea name="responsibilities" placeholder="Responsibilities" value={formData.responsibilities} onChange={handleChange} className="border p-2 rounded" rows={5} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 rounded" required />
        <select name="job_level" value={formData.job_level} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Job Level</option>
          <option value="intern">Intern</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
        </select>
        <input type="text" name="experience" placeholder="Required Experience" value={formData.experience} onChange={handleChange} className="border p-2 rounded" required />
        <select name="work_type" value={formData.work_type} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Work Type</option>
          <option value="onsite">Onsite</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
