import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  CiUser, 
  CiMail, 
  CiLocationOn, 
  CiPhone, 
  CiBookmark, 
  CiFileOn 
} from "react-icons/ci";
import { FaGraduationCap, FaBriefcase, FaRegSave } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";

function JobSeekerProfile() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    address: "",
    mobile: "",
    gender: "",
    education_level: "",
    degree: "",
    university: "",
    preferred_industry: "",
    job_level: "",
    cv: null,
  });
  const [uploadedCV, setUploadedCV] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("personal");

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/profile/",
    headers: { Authorization: `Bearer ${token}` },
  });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("");
        setFormData({
          ...res.data,
          cv: null,
        });

        if (res.data.cv) {
          setUploadedCV(res.data.cv);
        }
      } catch (err) {
        console.error(err);
        setMessage({ text: "Failed to load profile.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    }
    try {
      const res = await api.patch("", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.cv) {
        setUploadedCV(res.data.cv);
      }
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to update profile.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal Info", icon: CiUser },
    { id: "education", label: "Education", icon: FaGraduationCap },
    { id: "preferences", label: "Job Preferences", icon: FaBriefcase },
    { id: "cv", label: "CV / Resume", icon: CiFileOn },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-linear-to-r from-[#3A4EF9] to-[#2A3ED9] px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <CiUser className="text-3xl" />
          Job Seeker Profile
        </h2>
        <p className="text-blue-100 mt-1">Manage your personal information and job preferences</p>
      </div>
      <div className="border-b border-gray-200 px-8">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-4 px-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === id
                  ? "border-[#3A4EF9] text-[#3A4EF9]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="text-lg" />
              {label}
            </button>
          ))}
        </div>
      </div>
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

      <form onSubmit={handleSubmit} className="p-8" encType="multipart/form-data">
        {activeTab === "personal" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 rounded-lg w-full text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <div className="relative">
                  <CiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {activeTab === "education" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                <select
                  name="education_level"
                  value={formData.education_level}
                  onChange={handleChange}
                  className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                >
                  <option value="">Select Education Level</option>
                  <option value="highschool">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                <div className="relative">
                  <IoMdSchool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="degree"
                    placeholder="e.g., B.Sc. Computer Science"
                    value={formData.degree}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">University/Institution</label>
                <input
                  type="text"
                  name="university"
                  placeholder="Enter university name"
                  value={formData.university}
                  onChange={handleChange}
                  className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === "preferences" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Industry</label>
                <div className="relative">
                  <CiBookmark className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="preferred_industry"
                    placeholder="e.g., IT, Healthcare, Finance"
                    value={formData.preferred_industry}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Level</label>
                <select
                  name="job_level"
                  value={formData.job_level}
                  onChange={handleChange}
                  className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                >
                  <option value="">Select Job Level</option>
                  <option value="intern">Intern</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead / Manager</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {activeTab === "cv" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current CV</label>
              {uploadedCV ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CiFileOn className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{uploadedCV.split("/").pop()}</p>
                      <p className="text-xs text-gray-500">Uploaded CV</p>
                    </div>
                  </div>
                  <a
                    href={`http://127.0.0.1:8000${uploadedCV}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    View CV
                  </a>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                  <CiFileOn className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No CV uploaded yet</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload New CV</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#3A4EF9] transition">
                <input
                  type="file"
                  name="cv"
                  onChange={handleChange}
                  className="hidden"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <CiFileOn className="text-3xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Uploading a new CV will replace the existing one.
              </p>
            </div>
          </div>
        )}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="w-full md:w-auto px-8 py-3 bg-[#3A4EF9] text-white rounded-lg font-semibold hover:bg-[#2A3ED9] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <FaRegSave />
                Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobSeekerProfile;