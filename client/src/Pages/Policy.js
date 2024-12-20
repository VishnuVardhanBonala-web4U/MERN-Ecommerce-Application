import React from "react";
import Layout from "../Components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title="Privacy Policy ">
      {/* Title Section with Fade-in Animation */}
      <h1 className="text-center text-4xl font-semibold text-indigo-700 my-8  animate-opacity transition-opacity duration-500 ease-in-out">
        Policy & Privacy
      </h1>

      <div className="flex  flex-col md:flex-row items-start justify-between min-h-[80vh]">
        {/* Left Side - Policy Content */}
        <div className="w-full shadow-md  rounded-lg md:w-1/2 p-4 space-y-4  animate-opacity transition-opacity duration-500 ease-in-out delay-200">
          <ul className="list-none space-y-4">
            <h6 className="text-xl font-bold text-red-600 text-center">
              Policy & Privacy Info
            </h6>
            <li className="text-lg text-gray-700  animate-opacity transition-opacity duration-500 ease-in-out delay-400">
              Information Collection: We collect only the necessary personal
              information required to process your orders and improve your
              shopping experience.
            </li>
            <li className="text-lg text-gray-700  animate-opacity transition-opacity duration-500 ease-in-out delay-600">
              Your Rights: You have the right to access, update, or delete your
              personal data at any time. You can also opt-out of marketing
              communications.
            </li>
            <li className="text-lg text-gray-700  animate-opacity transition-opacity duration-500 ease-in-out delay-800">
              Policy Updates: We may update our privacy policy periodically to
              reflect any changes in our practices or legal requirements.
            </li>
          </ul>
        </div>

        {/* Right Side - Image with Scale on Hover */}
        <div className="w-full md:w-1/2 flex justify-center items-center  animate-opacity transition-opacity duration-500 ease-in-out delay-100">
          <img
            src="https://termshub.io/v3/assets/images/products/privacy_policy_hero.svg"
            className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            alt="Privacy Policy Image"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
