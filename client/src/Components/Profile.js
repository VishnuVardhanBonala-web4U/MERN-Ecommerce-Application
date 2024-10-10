import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UserMenu from "./userpages/UserMenu";
import { useAuth } from "../Context/AuthContext";
import Layout from "./Layout/Layout";

import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Profile.css"; // Ensure you have a custom CSS file for additional styles

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
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/profile`, {
        name,
        password,
        phone,
        address,
      });
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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            <UserMenu />
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="card p-4">
              <h4 className="card-title mb-4">User Profile</h4>
              <form onSubmit={handleSubmit} className="form">
                <div className="mb-3 row position-relative">
                  <label htmlFor="name" className="form-label">
                    <FaUser className="form-icon " /> Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control "
                    id="name"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>

                <div className="mb-3 row position-relative">
                  <label htmlFor="email" className="form-label">
                    <FaEnvelope className="form-icon" /> Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3  row position-relative">
                  <label htmlFor="password" className="form-label">
                    <FaLock className="form-icon" /> Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3 row  position-relative">
                  <label htmlFor="phone" className="form-label">
                    <FaPhone className="form-icon" /> Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="phone"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3 row  position-relative">
                  <label htmlFor="address" className="form-label">
                    <FaHome className="form-icon" /> Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="address"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button type="submit" className="btn w-100 btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
