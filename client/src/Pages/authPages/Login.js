import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "./auth.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { LoginJson } from "../../data/Authdata";


const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        ...userdata,
      });
      if (res && res.data.success) {
        toast.success(res && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res && res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h5 className="text-center login-title">Welcome Back</h5>
          {LoginJson &&
            LoginJson.map((item, index) => (
              <div key={index} className="form-group">
                <label htmlFor={item.id}>{item.name}</label>
                <input
                  type={item.type}
                  className="form-control"
                  id={item.id}
                  name={item.name}
                  placeholder={item.placeholder}
                  required
                  onChange={handleChange}
                />
              </div>
            ))}
          <button type="submit" className="btn btn-primary form-control mt-2">
            Login
          </button>
          <Link className="btn btn-dark form-control mt-2" to="/forget-pass">
            Forget Password?
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
