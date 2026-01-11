import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Get JWT from localStorage (stored at login)
  const token = localStorage.getItem("access_token");

  // Axios instance with JWT
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/profile/", // base API path
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(""); // ✅ fetch from base URL
        setFormData({
          ...res.data,
          cv: null, // reset file input
        });
      } catch (err) {
        console.error(err);
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // empty dependency → run once

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
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Personal Info */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
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
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Education Level</option>
              <option value="highschool">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="masters">Masters</option>
            </select>
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="university"
              placeholder="University Name"
              value={formData.university}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* Job Preferences */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Job Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="preferred_industry"
              placeholder="Preferred Industry"
              value={formData.preferred_industry}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="job_level"
              value={formData.job_level}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Job Level</option>
              <option value="intern">Intern</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </section>

        {/* CV Upload */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Upload CV</h3>
          <input
            type="file"
            name="cv"
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

export default JobSeekerProfile;
