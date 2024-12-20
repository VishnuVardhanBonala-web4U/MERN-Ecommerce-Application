import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterJson } from "../../data/Authdata";
import Image from "../../../src/images/cart.png";

const Register = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        {
          ...userdata,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-3 bg-gray-100">
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-4 hover:shadow-lg">
          <div className="flex items-center justify-evenly ">
            <img src={Image} alt="Cart" className="w-24 h-24 object-contain animate-bounce transition-all scroll-smooth" />
            <h3 className="text-2xl  text-center  font-bold text-gray-800 mb-2">
              Register Here
            </h3>
            <img src={Image} alt="Cart" className="w-24 h-24 object-contain animate-bounce transition-all scroll-smooth" />
          </div>

          <form onSubmit={handleSubmit}>
            {RegisterJson.map((item, index) => (
              <div className="mb-1" key={index}>
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
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
