import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployerProfile() {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    address: "",
    website: "",
    industry: "",
    company_size: "",
    description: "",
    logo: null,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Get JWT from localStorage (stored at login)
  const token = localStorage.getItem("access_token");

  // Axios instance with JWT
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/employer-profile/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch existing employer profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("");
        setFormData({
          ...res.data,
          logo: null, // reset file input
        });
      } catch (err) {
        console.error(err);
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      await api.patch("", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Company Profile</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Company Info */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="website"
              placeholder="Website URL"
              value={formData.website}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="company_size"
              value={formData.company_size}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Company Size</option>
              <option value="small">1-50</option>
              <option value="medium">51-200</option>
              <option value="large">201-500</option>
              <option value="enterprise">500+</option>
            </select>
          </div>
        </section>

        {/* Description */}
        <section>
          <h3 className="text-lg font-semibold mb-3">About Company</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of your company"
            className="border p-2 rounded w-full"
            rows={5}
          />
        </section>

        {/* Logo Upload */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Upload Company Logo</h3>
          <input
            type="file"
            name="logo"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default EmployerProfile;
