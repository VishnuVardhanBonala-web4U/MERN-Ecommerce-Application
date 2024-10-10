import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


const ForgotPass = () => {
  const [userdata, Setuserdata] = useState({
    email: "",
    newpassword: "",
    answer: "",
  });

  const navigate = useNavigate();
  const HandleChange = (e) => {
    Setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/forgetpass`, {
        ...userdata,
      });
      if (res && res.data.success) {
        toast.success(res && res.data.message);
        navigate("/login");
      } else {
        toast.error(res && res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Layout title="Forget-password">
        <div className="login" style={{ margin: "0px !important" }}>
          <form onSubmit={HandleSubmit}>
            <h5 className="text-center m-0 ">Reset Password</h5>

            <div className="">
              <label> Email Address</label>

              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                placeholder="Enter your Email"
                required
                onChange={HandleChange}
              />
            </div>

            <div className="">
              <label>Answer </label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="answer"
                placeholder="Enter your Answer"
                required
                onChange={HandleChange}
              />
            </div>

            <div className="">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="newpassword"
                placeholder="Enter your Password"
                required
                onChange={HandleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary form-control mt-2">
              Reset Password
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPass;
