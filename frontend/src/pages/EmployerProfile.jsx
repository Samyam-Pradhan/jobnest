import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [message, setMessage] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);

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
        setMessage(err.response?.data?.detail || "Failed to load profile.");
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
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    try {
      await api.patch("", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data || "Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-8">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-600">Company Profile</h2>

      {message && (
        <p className={`text-center font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-8"
      >
        {/* Company Info */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
              required
            />
            <input
              type="email"
              name="contact_email"
              placeholder="HR / Company Email"
              value={formData.contact_email}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
            <input
              type="text"
              name="website"
              placeholder="Website URL"
              value={formData.website}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
            <select
              name="company_size"
              value={formData.company_size}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            >
              <option value="">Company Size</option>
              <option value="small">1-50</option>
              <option value="medium">51-200</option>
              <option value="large">201-500</option>
              <option value="enterprise">500+</option>
            </select>
          </div>
        </section>

        {/* About Company */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">About Company</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of your company"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            rows={5}
          />
        </section>

        {/* Company Logo */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Upload Company Logo</h3>
          <div className="flex items-center space-x-4">
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Company Logo"
                className="w-28 h-28 object-cover rounded-full border"
              />
            )}
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default EmployerProfile;
