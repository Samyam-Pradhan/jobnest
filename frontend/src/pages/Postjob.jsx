import React, { useState } from "react";
import axios from "axios";

function PostJob() {
  const token = localStorage.getItem("access_token");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    job_level: "",
    description: "",
    experience: "",
    closing_date: "",
    work_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("employer/jobs/", formData);
      setMessage("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        responsibilities: "",
        location: "",
        job_level: "",
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
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Post a New Job</h2>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows={5}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          placeholder="Responsibilites"
          rows={5}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="job_level"
          value={formData.job_level}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Job Level</option>
          <option value="intern">Intern</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior</option>
        </select>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Required Experience"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Work Type</option>
          <option value="onsite">Onsite</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
