import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserEdit, FaBox } from "react-icons/fa";

const UserMenu = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white shadow-lg rounded-xl p-2 w-full max-w-xs mx-auto">
      <h4 className="text-xl font-semibold text-center mb-4">
        User Dashboard
      </h4>
      <div className="list-group space-y-2">
        <NavLink
          to="/dashboard/user/profile"
          className="flex items-center text-lg text-white hover:bg-blue-800 hover:scale-105 transform transition-all duration-300 rounded-lg py-2 px-2"
        >
          <FaUserEdit className="mr-4 text-xl" />
          Update Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="flex items-center text-lg text-white hover:bg-blue-800 hover:scale-105 transform transition-all duration-300 rounded-lg py-2 px-2"
        >
          <FaBox className="mr-4 text-xl" />
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
