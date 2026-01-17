import React from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto w-full px-6 py-16 flex flex-col gap-16">

          {/* Hero Section */}
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Welcome to JobNest
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Next<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Career Move
              </span><br />
              Starts Here
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Connect with opportunities that match your ambitions. Whether you're seeking talent or your dream role, JobNest makes it effortless.
            </p>
          </div>

          {/* Role Selection Section */}
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Choose Your Path
              </h2>
              <p className="text-gray-600">
                Select your role to get started
              </p>
            </div>

            <div className="w-full max-w-4xl flex flex-col sm:flex-row gap-6">
              {/* Job Seeker Card */}
              <div
                onClick={() => handleRole("jobseeker")}
                className="flex-1 group cursor-pointer"
              >
                <div className="relative h-full p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img src={jobIcon} alt="Job Seeker" className="w-16" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900">
                      Job Seeker
                    </h3>
                    
                    <p className="text-gray-600 text-sm">
                      Find your dream job and advance your career
                    </p>
                    
                    <div className="mt-2 text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Get Started
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employer Card */}
              <div
                onClick={() => handleRole("employer")}
                className="flex-1 group cursor-pointer"
              >
                <div className="relative h-full p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img src={employerIcon} alt="Employer" className="w-16" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900">
                      Employer
                    </h3>
                    
                    <p className="text-gray-600 text-sm">
                      Discover top talent for your organization
                    </p>
                    
                    <div className="mt-2 text-green-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Get Started
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;