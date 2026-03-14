import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaBriefcase, 
  FaClock,
  FaRegBuilding,
  FaEdit,
  FaTrashAlt,
  FaEye
} from "react-icons/fa";
import { MdWork } from "react-icons/md";

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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-500">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <FaBriefcase className="text-6xl text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-700">No Jobs Posted Yet</h3>
          <p className="text-gray-500">Start by posting your first job opening.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3A4EF9] to-[#2A3ED9] px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaBriefcase className="text-2xl" />
          My Posted Jobs
        </h2>
        <p className="text-blue-100 mt-1">Manage your job listings</p>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Job Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3A4EF9] transition">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaRegBuilding className="text-[#3A4EF9]" />
                      <span>Your Company</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>

                {/* Job Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaMapMarkerAlt className="mr-3 text-gray-400 w-4" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaBriefcase className="mr-3 text-gray-400 w-4" />
                    <span>{job.job_level}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaClock className="mr-3 text-gray-400 w-4" />
                    <span>{job.experience} experience</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <MdWork className="mr-3 text-gray-400 w-4 text-base" />
                    <span>{job.work_type}</span>
                  </div>
                </div>

                {/* Posted Date */}
                <div className="flex items-center text-xs text-gray-400 border-t border-gray-100 pt-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>Posted on: {new Date(job.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex border-t border-gray-100 divide-x divide-gray-100">
                <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:text-[#3A4EF9] hover:bg-blue-50 transition flex items-center justify-center gap-2">
                  <FaEye className="text-base" />
                  View
                </button>
                <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition flex items-center justify-center gap-2">
                  <FaEdit className="text-base" />
                  Edit
                </button>
                <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-2">
                  <FaTrashAlt className="text-base" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyJobs;