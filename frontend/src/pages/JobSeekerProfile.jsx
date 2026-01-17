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
      } catch (err) {
        console.error(err);
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

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

  if (loading)
    return <p className="text-center text-gray-500 mt-8">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-600">My Profile</h2>

      {message && (
        <p
          className={`text-center font-medium ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        encType="multipart/form-data"
      >
        {/* Personal Information */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="border p-3 rounded-lg bg-gray-100 w-full cursor-not-allowed"
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
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
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
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
            <input
              type="text"
              name="university"
              placeholder="University Name"
              value={formData.university}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
          </div>
        </section>

        {/* Job Preferences */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Job Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="preferred_industry"
              placeholder="Preferred Industry"
              value={formData.preferred_industry}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
            />
            <select
              name="job_level"
              value={formData.job_level}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
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
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Upload CV
          </h3>
          <input
            type="file"
            name="cv"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
          />
        </section>

        {/* Submit Button */}
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

export default JobSeekerProfile;
