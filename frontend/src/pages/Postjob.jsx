import React, { useState } from "react";
import axios from "axios";
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaLevelUpAlt, 
  FaClock, 
  FaRegSave,
  FaFileAlt,
  FaTasks,
  FaRegBuilding
} from "react-icons/fa";
import { MdWork, MdLocationCity } from "react-icons/md";

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
  const [message, setMessage] = useState({ text: "", type: "" });

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
    setMessage({ text: "", type: "" });

    try {
      await api.post("employer/jobs/", formData);
      setMessage({ text: "Job posted successfully!", type: "success" });
      setFormData({
        title: "",
        description: "",
        responsibilities: "",
        location: "",
        job_level: "",
        experience: "",
        work_type: "",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error posting job. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3A4EF9] to-[#2A3ED9] px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaBriefcase className="text-2xl" />
          Post a New Job
        </h2>
        <p className="text-blue-100 mt-1">Create a job listing to find the perfect candidate</p>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mx-8 mt-6 p-4 rounded-lg ${
          message.type === "success" 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <p className="flex items-center gap-2">
            {message.type === "success" ? (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message.text}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8">
        {/* Job Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title </label>
          <div className="relative">
            <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
              required
            />
          </div>
        </div>

        {/* Location & Job Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Level </label>
            <div className="relative">
              <FaLevelUpAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="job_level"
                value={formData.job_level}
                onChange={handleChange}
                className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition appearance-none bg-white"
                required
              >
                <option value="">Select Job Level</option>
                <option value="intern">Intern</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead / Manager</option>
              </select>
            </div>
          </div>
        </div>

        {/* Experience & Work Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Required </label>
            <div className="relative">
              <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Type </label>
            <div className="relative">
              <MdWork className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="work_type"
                value={formData.work_type}
                onChange={handleChange}
                className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition appearance-none bg-white"
                required
              >
                <option value="">Select Work Type</option>
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description </label>
          <div className="relative">
            <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
              rows={5}
              required
            />
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities </label>
          <div className="relative">
            <FaTasks className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
              rows={5}
              required
            />
          </div>
        </div>

        {/* Preview Card (Optional visual helper) */}
        {Object.values(formData).some(val => val) && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-sm font-semibold text-[#3A4EF9] flex items-center gap-2 mb-3">
              <FaRegBuilding />
              Job Preview
            </h4>
            <div className="text-sm text-gray-600">
              {formData.title && <p className="font-medium text-gray-800">{formData.title}</p>}
              {(formData.location || formData.job_level) && (
                <p className="text-xs text-gray-500 mt-1">
                  {formData.location} {formData.job_level && `• ${formData.job_level}`}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-[#3A4EF9] text-white rounded-lg font-semibold hover:bg-[#2A3ED9] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Posting...
              </>
            ) : (
              <>
                <FaRegSave />
                Post Job
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostJob;