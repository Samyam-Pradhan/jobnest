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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Post a New Job</h2>

      {message && (
        <p className={`mb-4 font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Job Details</h3>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            rows={4}
            required
          />
          <textarea
            name="responsibilities"
            placeholder="Responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            rows={4}
            required
          />
        </div>

        {/* Location & Level */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Requirements</h3>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <select
            name="job_level"
            value={formData.job_level}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          >
            <option value="">Select Job Level</option>
            <option value="intern">Intern</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>
          <input
            type="text"
            name="experience"
            placeholder="Required Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Work Type */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Work Information</h3>
          <select
            name="work_type"
            value={formData.work_type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          >
            <option value="">Select Work Type</option>
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
