import React from "react";
import { useNavigate } from "react-router-dom";
import jobImage from "../assets/home.jpg";
import jobIcon from "../assets/jobseeker.png";
import employerIcon from "../assets/employer.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  const handleRole = (role) => {
    localStorage.setItem("role", role);
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      {/* Main Container */}
      <div className="min-h-screen flex bg-white">
        
        {/* Left Section (Image) */}
        <div className="hidden md:flex w-1/2 items-center justify-center px-16">
          <img
            src={jobImage}
            alt="Job illustration"
            className="w-[90%] max-w-none max-h-[85vh] object-contain"
          />
        </div>

        {/* Right Section (Role Selection) */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-16">
          <div className="container max-w-2xl w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Select Your Role
            </h1>

            <p className="text-gray-600 mb-8 text-center">
              Choose how you want to continue
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Job Seeker */}
              <div
                onClick={() => handleRole("jobseeker")}
                className="flex-1 flex flex-col items-center justify-center p-6 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition"
              >
                <img src={jobIcon} alt="Job Seeker" className="w-20 mb-4" />
                <span className="text-xl font-semibold text-blue-700">
                  Job Seeker
                </span>
              </div>

              {/* Employer */}
              <div
                onClick={() => handleRole("employer")}
                className="flex-1 flex flex-col items-center justify-center p-6 bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition"
              >
                <img src={employerIcon} alt="Employer" className="w-20 mb-4" />
                <span className="text-xl font-semibold text-green-700">
                  Employer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer directly attached */}
      <Footer />
    </>
  );
}

export default Home;
