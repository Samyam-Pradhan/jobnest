
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function JobApplicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicantsRes, jobRes] = await Promise.all([
          api.get(`jobs/${id}/applicants/`),
          api.get(`jobs/${id}/`),
        ]);

        setApplicants(applicantsRes.data);
        setJobTitle(jobRes.data.title);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const statusColors = {
    applied: "bg-blue-100 text-blue-600",
    shortlisted: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
  };

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-8 mt-8">
        <div className="mb-6">
          <Link
            to="/employer/jobs"
            className="text-sm text-indigo-500 hover:underline"
          >
            ← Back to My Jobs
          </Link>

          <h1 className="text-2xl font-bold text-indigo-600 mt-2">
            Applicants for "{jobTitle}"
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {applicants.length} applicant
            {applicants.length !== 1 ? "s" : ""}
          </p>
        </div>

        {applicants.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center text-gray-400">
            No applications yet for this job.
          </div>
        ) : (
          <div className="space-y-4">
            {applicants.map((app) => (
              <div
                key={app.id}
                className="bg-white shadow rounded-lg p-5 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {app.applicant_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {app.applicant_email}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Applied:{" "}
                    {new Date(app.applied_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      statusColors[app.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {app.status}
                  </span>

                  {app.cv ? (
                    <a
                      href={app.cv}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      View CV
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">
                      No CV
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default JobApplicants;

