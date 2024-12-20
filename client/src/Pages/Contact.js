import React from "react";
import Layout from "../Components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <div className="container mx-auto p-6 min-h-screen flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Contact Information Section with Slide-In Animation */}
        <div className="w-full md:w-1/2 p-4 animate__animated animate__fadeIn animate__delay-1s animate__slower">
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6 transition duration-300 transform hover:scale-105 hover:text-yellow-400">
            Contact Us
          </h1>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:shadow-xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500">
            <h4 className="text-xl font-semibold text-white mb-4 text-center">
              Our Marketing Address:
            </h4>
            <ul className="space-y-4 text-white">
              <li className="text-lg hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105">
                152 A Charlotte Street
              </li>
              <li className="text-lg hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105">
                United States of America
              </li>
              <li className="text-lg hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105">
                Phone: 874-343-343983-34
              </li>
              <li className="text-lg hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105">
                We are available 24/7
              </li>
            </ul>
            <button className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:scale-110 transition duration-300 transform hover:shadow-xl hover:animate-bounce">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Image Section with Zoom and Rotate Animation */}
        <div className="w-full md:w-1/2 p-4 flex justify-center animate__animated animate__fadeIn animate__delay-2s">
          <img
            src="https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000_1280.jpg"
            alt="Contact Us"
            className="rounded-lg shadow-lg transform hover:scale-110 transition duration-500 ease-in-out hover:rotate-3 hover:animate-pulse"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
