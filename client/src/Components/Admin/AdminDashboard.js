import React from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../Layout/Layout";
import { useAuth } from "../../Context/AuthContext";
import { FaUserTie, FaEnvelope, FaPhone } from "react-icons/fa"; // Import icons

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Admin"}>
      <div className="container mx-auto p-6 dashboard">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 col-span-1">
            <AdminMenu />
          </div>

          <div className="lg:col-span-3 col-span-1 bg-white p-8 shadow-2xl rounded-xl space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900 flex items-center space-x-3">
              <FaUserTie className="text-3xl text-blue-600" />
              <span className="text-xl">Admin Name: {auth?.user?.name}</span>
            </h3>

            <h5 className="mt-4 text-xl text-gray-700 flex items-center space-x-3">
              <FaEnvelope className="text-2xl text-blue-600" />
              <span className="text-lg">Admin Email: {auth?.user?.email}</span>
            </h5>

            <p className="mt-4 text-xl text-gray-700 flex items-center space-x-3">
              <FaPhone className="text-2xl text-blue-600" />
              <span className="text-lg">
                Admin Contact: {auth?.user?.phone}
              </span>
            </p>

            {/* Additional Info Section */}
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
