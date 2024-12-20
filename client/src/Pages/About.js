import React from "react";
import Layout from "../Components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About Us">
      <div className="container mx-auto p-6 min-h-screen flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left mb-6">
            About Us
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to our e-commerce platform, where innovation meets
            convenience. Our mission is to provide an exceptional shopping
            experience by offering a wide range of products and outstanding
            customer service. Whether you're here for the latest trends, home
            essentials, or tech gadgets, we’ve got you covered.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <img
            src="https://cdn.pixabay.com/photo/2017/08/05/00/12/girl-2581913_1280.jpg"
            alt="About Us"
            className="rounded-lg shadow-lg w-full md:w-3/4 object-cover"
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
