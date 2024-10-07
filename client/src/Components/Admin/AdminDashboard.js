import React from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../Layout/Layout";
import { useAuth } from "../../Context/AuthContext";
import "../css/AdminDashboard.css"; // Ensure you have a separate CSS file for custom styles
import { FaUserTie, FaEnvelope, FaPhone } from "react-icons/fa"; // Import icons

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Admin"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12 mb-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-8 col-12">
            <div className="card p-4">
              <h3 className="dashboard-header">
                <FaUserTie className="dashboard-icon" /> Admin Name:{" "}
                {auth?.user?.name}
              </h3>
              <h5 className="dashboard-info">
                <FaEnvelope className="dashboard-icon" /> Admin Email:{" "}
                {auth?.user?.email}
              </h5>
              <p className="dashboard-info">
                <FaPhone className="dashboard-icon" /> Admin Contact:{" "}
                {auth?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
