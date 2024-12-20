import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
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
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center p-3 bg-gray-100 ">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white shadow-md rounded-lg hover:shadow-lg"
        >
          <h5 className="text-2xl font-bold text-center text-gray-800 mb-6">
           Login Here
          </h5>
          {LoginJson &&
            LoginJson.map((item, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={item.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {item.label}
                </label>
                <input
                  type={item.type}
                  id={item.id}
                  name={item.name}
                  placeholder={item.placeholder}
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            ))}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm"
          >
            Login
          </button>

          <div className="flex justify-around">
            <Link
              to="/forget-pass"
              className="block text-center mt-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-medium text-sm"
            >
              Forget Password?
            </Link>
            <Link
              to="/register"
              className="block bg-red-400 text-center mt-4 py-2 px-4  hover:bg-red-500 text-white rounded-md font-medium text-sm"
            >
              Did not have account?
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
