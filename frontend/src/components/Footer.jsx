import React from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo Section with Briefcase Icon */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <FaBriefcase className="text-2xl text-blue-900" />
            </div>
            <span className="text-2xl font-bold">JobNest</span>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            Connecting talented professionals with amazing companies. Find your dream job or the perfect candidate today.
          </p>
        </div>

        {/* Site Map */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-6 relative">
            Site Map
            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-blue-300 rounded-full"></span>
          </h3>
          <ul className="space-y-3 text-center md:text-left">
            <li>
              <Link to="/" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                Homepage
              </Link>
            </li>
            <li>
              <Link to="/job-seeker" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                Job Seeker
              </Link>
            </li>
            <li>
              <Link to="/employer" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                Employer
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-6 relative">
            Legal
            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-blue-300 rounded-full"></span>
          </h3>
          <ul className="space-y-3 text-center md:text-left">
            <li>
              <Link to="/privacy-policy" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                Terms & Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-6 relative">
            Socials
            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-blue-300 rounded-full"></span>
          </h3>
          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition group"
              aria-label="Facebook"
            >
              <FaFacebook className="text-white text-lg group-hover:scale-110 transition" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition group"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-white text-lg group-hover:scale-110 transition" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition group"
              aria-label="Twitter"
            >
              <FaTwitter className="text-white text-lg group-hover:scale-110 transition" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition group"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white text-lg group-hover:scale-110 transition" />
            </a>
          </div>
          
          {/* Newsletter signup */}
          <div className="mt-6 w-full">
            <p className="text-blue-200 text-sm mb-2">Stay updated</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l-lg bg-blue-800 text-white placeholder-blue-300 border border-blue-700 focus:outline-none focus:border-blue-400 text-sm"
              />
              <button className="px-4 py-2 bg-blue-700 text-white rounded-r-lg font-medium text-sm hover:bg-blue-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} JobNest. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;