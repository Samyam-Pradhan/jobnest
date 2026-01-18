import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/saved-jobs/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>

        {!jobs.length ? (
          <p>No saved jobs.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white shadow rounded cursor-pointer"
                onClick={() => navigate(`/jobs/${item.job.id}`)}
              >
                <h3 className="font-semibold text-indigo-600">
                  {item.job.title}
                </h3>
                <p>{item.job.company_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default SavedJobs;
