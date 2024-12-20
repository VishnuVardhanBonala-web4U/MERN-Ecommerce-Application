import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white shadow-lg py-4">
      {/* Footer Top Section */}
      <div className="text-center text-sm md:text-base">
        <h5>All &copy; 2024 Rights Reserved</h5>
      </div>

      {/* Footer Navigation Links */}
      <div className="flex justify-center mt-2 space-x-4 text-sm md:text-base">
        <Link
          to="/"
          className="hover:text-blue-400 transition duration-300 ease-in-out"
        >
          Homepage
        </Link>
        <Link
          to="/about"
          className="hover:text-blue-400 transition duration-300 ease-in-out"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="hover:text-blue-400 transition duration-300 ease-in-out"
        >
          Contact
        </Link>
        <Link
          to="/policy"
          className="hover:text-blue-400 transition duration-300 ease-in-out"
        >
          Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
