import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UserMenu from "./userpages/UserMenu";
import { useAuth } from "../Context/AuthContext";
import Layout from "./Layout/Layout";

import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from "react-icons/fa";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile`,
        {
          name,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar (UserMenu) */}
          <div className="col-span-1 lg:col-span-1 mb-4">
            <UserMenu />
          </div>

          {/* User Profile Form */}
          <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
              User Profile
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  <FaUser className="inline-block mr-2" /> Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg"
                  id="name"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  <FaEnvelope className="inline-block mr-2" /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  className="mt-1 p-2 border border-gray-300 rounded-lg"
                  id="email"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  <FaLock className="inline-block mr-2" /> Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg"
                  id="password"
                  placeholder="Enter Your Password"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  <FaPhone className="inline-block mr-2" /> Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg"
                  id="phone"
                  placeholder="Enter Your Phone"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  <FaHome className="inline-block mr-2" /> Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg"
                  id="address"
                  placeholder="Enter Your Address"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
