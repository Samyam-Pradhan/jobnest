import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaMapMarkerAlt, FaBriefcase, FaClock, FaRegBuilding } from "react-icons/fa";
import { MdWork } from "react-icons/md";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/saved-jobs/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading saved jobs...</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-linear-to-r from-[#3A4EF9] to-[#2A3ED9] px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaBookmark className="text-2xl" />
          Saved Jobs
        </h2>
        <p className="text-blue-100 mt-1">Jobs you've bookmarked for later</p>
      </div>
      <div className="p-8">
        {!jobs.length ? (
          <div className="text-center py-16">
            <FaBookmark className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No saved jobs yet</h3>
            <p className="text-gray-500 mb-6">
              When you save jobs, they'll appear here for easy access.
            </p>
            <button
              onClick={() => navigate("/jobs")}
              className="px-6 py-3 bg-[#3A4EF9] text-white rounded-lg font-semibold hover:bg-[#2A3ED9] transition"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/jobs/${item.job.id}`)}
                className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    {item.job.company_logo ? (
                      <img
                        src={item.job.company_logo}
                        alt={item.job.company_name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-lg">
                        {item.job.company_name?.charAt(0) || 'C'}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.job.title}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <FaRegBuilding className="text-gray-500 text-xs" />
                        {item.job.company_name}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-gray-600 text-sm bg-gray-50 p-2 rounded-lg">
                      <FaMapMarkerAlt className="mr-2 text-gray-500 w-3" />
                      <span className="truncate">{item.job.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm bg-gray-50 p-2 rounded-lg">
                      <FaBriefcase className="mr-2 text-gray-500 w-3" />
                      <span className="truncate">{item.job.job_level}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm bg-gray-50 p-2 rounded-lg">
                      <FaClock className="mr-2 text-gray-500 w-3" />
                      <span className="truncate">{item.job.experience}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm bg-gray-50 p-2 rounded-lg">
                      <MdWork className="mr-2 text-gray-500 w-3" />
                      <span className="truncate">{item.job.work_type}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 border-t border-gray-100 pt-4">
                    <FaBookmark className="mr-2 text-gray-400 text-xs" />
                    <span>Saved on: {new Date(item.saved_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;