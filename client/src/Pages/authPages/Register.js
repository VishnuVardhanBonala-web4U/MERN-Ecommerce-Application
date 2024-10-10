import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterJson } from "../../data/Authdata";

import "./auth.css";
import Image from "../../../src/images/cart.png";

const Register = () => {
  const navigate = useNavigate();
  const [userdata, Setuserdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const HandleChange = (e) => {
    Setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, { ...userdata });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
      console.log(userdata);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="cart_image text-center mb-3">
        <img src={Image} alt="Cart" className="img-fluid" />
      </div>
      <div className="register-container d-flex justify-content-center align-items-center">
        <div className="card p-3 shadow-lg my-3" style={{ maxWidth: "500px", width: "100%" }}>
          <h3 className="text-center mb-3">Create an Account</h3>
          <form onSubmit={HandleSubmit}>
            {RegisterJson.map((item, index) => (
              <div className="mb-3" key={index}>
                <label className="form-label">{item.label}</label>
                <input
                  type={item.type}
                  className="form-control"
                  id={item.id}
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={HandleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-100 mt-3 rounded-pill">
              Register
            </button>
          </form>
          <div className="text-center mt-2">
            <p>
              Already have an account? <a href="/login" className="text-primary">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
