import React from "react";
import { NavLink, useParams } from "react-router-dom";

const AdminMenu = ({ id }) => {
  const param = useParams();
  return (
    <div className="text-center">
      <div className="bg-white p-6 shadow-2xl rounded-xl space-y-6">
        <h4 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h4>

        <NavLink
          to="/dashboard/admin/create-category"
          className="block py-3 px-5 text-gray-800 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          <span className="font-medium">Create Category</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className="block py-3 px-5 text-gray-800 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          <span className="font-medium">Create Product</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/orders"
          className="block py-3 px-5 text-gray-800 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          <span className="font-medium">Orders</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className="block py-3 px-5 text-gray-800 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          <span className="font-medium">Products</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
