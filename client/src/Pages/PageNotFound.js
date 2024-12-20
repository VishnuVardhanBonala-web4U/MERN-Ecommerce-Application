import React from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom"; // Using useNavigate instead of useHistory

const PageNotFound = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoHome = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <Layout title="404 | Page Not Found">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-6">
          {/* 404 Image */}
          <img
            src="https://via.placeholder.com/400x400?text=404"
            alt="Page not found"
            className="mx-auto mb-4 rounded-lg shadow-lg"
          />
          {/* 404 Heading */}
          <h1 className="text-6xl font-bold text-red-600">Oops! 404</h1>
          <p className="text-xl text-gray-700">
            The page you're looking for doesn't exist. It may have been moved or
            deleted.
          </p>
          {/* Button to go home */}
          <button
            onClick={handleGoHome}
            className="mt-6 px-8 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transform transition duration-200 ease-in-out hover:scale-105"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
