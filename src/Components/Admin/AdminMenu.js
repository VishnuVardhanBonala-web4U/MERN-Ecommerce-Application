import React from "react";
import { NavLink, useParams } from "react-router-dom";

const AdminMenu = ({ id }) => {
  const param = useParams();
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu shadow rounded">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action shadow "
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action shadow"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action shadow"
          >
            Products
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
