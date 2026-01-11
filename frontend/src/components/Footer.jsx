import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-600 text-white mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo Section */}
        <div className="flex justify-center md:justify-start">
          <img
            src="/JN.png"
            alt="JobNest Logo"
            className="h-50 w-auto"
          />
        </div>

        {/* Site Map */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Site Map</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Homepage</Link></li>
            <li><Link to="/job-seeker" className="hover:underline">Job Seeker</Link></li>
            <li><Link to="/employer" className="hover:underline">Employer</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Services</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Socials</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">Facebook</a>
            </li>
            <li>
              <a href="#" className="hover:underline">LinkedIn</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Twitter</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Instagram</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-500 text-center py-4 text-sm">
        © 2026 JobNest. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
