import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [userdata, setUserdata] = useState({
    email: "",
    newpassword: "",
    answer: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/forgetpass`,
        {
          ...userdata,
        }
      );
      if (res && res.data.success) {
        toast.success(res && res.data.message);
        navigate("/login");
      } else {
        toast.error(res && res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <Layout title="Forgot Password">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white shadow-md rounded-lg"
        >
          <h5 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h5>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              placeholder="Enter your Answer"
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newpassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              placeholder="Enter your Password"
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm"
          >
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPass;
