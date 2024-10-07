import React from "react";
import UserMenu from "./UserMenu";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/AuthContext";
import "../css/UserDashboard.css"; // Ensure you have a separate CSS file for custom styles
import { FaEnvelope, FaMapMarkerAlt, FaUser } from "react-icons/fa";
// Import icons

const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - User"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12 mb-3">
            <UserMenu />
          </div>
          <div className="col-lg-9 col-md-8 col-12 userdetails_container">
            <div className="card p-4 ">
              <div className=" ">
                <h3 className="dashboard-header">
                  <FaUser className="dashboard-icon" /> UserName:{" "}
                  {auth?.user?.name}
                </h3>
              </div>

              <h5 className="dashboard-info">
                <FaEnvelope className="dashboard-icon" /> Email Address:{" "}
                {auth?.user?.email}
              </h5>
              <p className="dashboard-info">
                <FaMapMarkerAlt className="dashboard-icon" /> Address:{" "}
                {auth?.user?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
