import React from "react";
import UserMenu from "./UserMenu";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/AuthContext";
import { FaEnvelope, FaMapMarkerAlt, FaUser } from "react-icons/fa";

// Reusable component for displaying user details with better design
const UserDetailItem = ({ icon, label, value }) => (
  <p className="text-lg text-gray-700 mb-2 flex items-center hover:bg-blue-50 hover:text-blue-600 rounded-lg px-4 py-2 transition-all duration-300">
    <span className="mr-4 text-2xl text-blue-500">{icon}</span>
    <span className="font-semibold text-gray-800">{label}:</span>
    <span className="text-gray-600 text-md ml-2 border border-3 border-gray-50 mx-3 shadow-md rounded-full px-3">{value || "Not provided"}</span>
  </p>
);


const UserDashboard = () => {
  const [auth] = useAuth();

  // Check if user data exists
  if (!auth?.user) {
    return (
      <div className="text-center py-10 text-xl text-gray-500">Loading...</div>
    );
  }

  return (
    <Layout title={"Dashboard - User"}>
      <div className="container mx-auto p-6 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1 lg:col-span-1 bg-white shadow-lg rounded-2xl p-6">
            <UserMenu />
          </div>

          {/* User Info Section */}
          <div className="col-span-1 lg:col-span-3 bg-white shadow-xl rounded-2xl p-8">
            <div className="mb-6 flex items-center">
              <FaUser className="text-4xl text-blue-500 mr-4" />
              <h3 className="text-3xl text-gray-800 font-semibold">
                Welcome, {auth?.user?.name}!
              </h3>
            </div>

            {/* User Info */}
            <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6 rounded-xl shadow-lg mb-6">
              <h4 className="text-xl text-gray-700 font-semibold mb-4">
                User Profile
              </h4>
              <UserDetailItem
                icon={<FaEnvelope className="text-blue-500" />}
                label="Email Address"
                value={auth?.user?.email}
              />
              <UserDetailItem
                icon={<FaMapMarkerAlt className="text-blue-500" />}
                label="Address"
                value={auth?.user?.address}
              />
            </div>

            {/* Additional User Info */}
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
