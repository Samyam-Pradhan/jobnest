import React, { useState } from "react";

function JobSeekerProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    mobile: "",
    gender: "",
    educationLevel: "",
    degree: "",
    university: "",
    preferredIndustry: "",
    jobLevel: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send data to backend
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Info */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
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
              name="educationLevel"
              value={formData.educationLevel}
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
              name="preferredIndustry"
              placeholder="Preferred Industry"
              value={formData.preferredIndustry}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <select
              name="jobLevel"
              value={formData.jobLevel}
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
