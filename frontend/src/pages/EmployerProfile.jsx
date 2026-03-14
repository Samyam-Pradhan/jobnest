import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaBuilding, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaIndustry, 
  FaUsers, 
  FaRegSave,
  FaInfoCircle,
  FaImage,
  FaBriefcase
} from "react-icons/fa";

function EmployerProfile() {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_email: "",
    address: "",
    website: "",
    industry: "",
    company_size: "",
    description: "",
    logo: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [logoPreview, setLogoPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("company");

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/profile/employer/",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("");
        setFormData({
          ...res.data,
          logo: null,
        });
        if (res.data.logo) setLogoPreview(res.data.logo);
      } catch (err) {
        console.error(err);
        setMessage({ 
          text: err.response?.data?.detail || "Failed to load profile.", 
          type: "error" 
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setLogoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      await api.patch("", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ 
        text: err.response?.data?.message || "Failed to update profile.", 
        type: "error" 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-500">Loading company profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "company", label: "Company Info", icon: FaBuilding },
    { id: "about", label: "About", icon: FaInfoCircle },
    { id: "logo", label: "Company Logo", icon: FaImage },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3A4EF9] to-[#2A3ED9] px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaBuilding className="text-2xl" />
          Company Profile
        </h2>
        <p className="text-blue-100 mt-1">Manage your company information and branding</p>
      </div>

      {/* Tabs */}
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

      <form onSubmit={handleSubmit} className="p-8" encType="multipart/form-data">
        {/* Company Info Tab */}
        {activeTab === "company" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Enter company name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="contact_email"
                    placeholder="hr@company.com"
                    value={formData.contact_email}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Company address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="website"
                    placeholder="https://www.company.com"
                    value={formData.website}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <div className="relative">
                  <FaIndustry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="industry"
                    placeholder="e.g., Technology, Healthcare"
                    value={formData.industry}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="company_size"
                    value={formData.company_size}
                    onChange={handleChange}
                    className="border border-gray-200 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition appearance-none bg-white"
                  >
                    <option value="">Select company size</option>
                    <option value="small">1-50 employees</option>
                    <option value="medium">51-200 employees</option>
                    <option value="large">201-500 employees</option>
                    <option value="enterprise">500+ employees</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About Company</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell job seekers about your company culture, mission, values, benefits, and what makes your company a great place to work..."
                className="border border-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4EF9] focus:border-transparent transition w-full"
                rows={10}
              />
              <p className="text-xs text-gray-500 mt-2">
                A detailed company description helps attract the right candidates
              </p>
            </div>
          </div>
        )}

        {/* Logo Tab */}
        {activeTab === "logo" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Current Logo</label>
              <div className="flex flex-col items-center">
                {logoPreview ? (
                  <div className="relative mb-4">
                    <img
                      src={logoPreview}
                      alt="Company Logo"
                      className="w-40 h-40 object-cover rounded-2xl border-4 border-white shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg mb-4">
                    <FaBuilding className="text-5xl text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#3A4EF9] transition">
                <input
                  type="file"
                  name="logo"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center">
                  <FaImage className="text-3xl text-gray-400 mb-3" />
                  <p className="text-gray-600 font-medium mb-1">Click to upload company logo</p>
                  <p className="text-xs text-gray-500">PNG, JPG (Max 2MB)</p>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
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

export default EmployerProfile;