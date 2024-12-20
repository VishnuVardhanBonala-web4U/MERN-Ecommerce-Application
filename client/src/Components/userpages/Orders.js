import React, { useState, useEffect } from "react";
import axios from "axios";
import UserMenu from "../../Components/userpages/UserMenu";
import moment from "moment";
import { useAuth } from "../../Context/AuthContext";
import Layout from "../Layout/Layout";

import "../css/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap">
          {/* User Menu */}
          <div className="w-full md:w-1/4 lg:w-1/5 p-4">
            <UserMenu />
          </div>

          {/* Orders List */}
          <div className="w-full md:w-3/4 lg:w-4/5 p-4">
            <h1 className="text-2xl font-bold text-center mb-6">All Orders</h1>
            {orders?.length === 0 ? (
              <p className="text-center text-lg">You have no orders yet.</p>
            ) : (
              orders?.map((order, index) => (
                <div
                  className="bg-white border border-gray-200 rounded-lg shadow-md mb-3 p-2"
                  key={order._id}
                >
                  <table className="min-w-full table-auto text-gray-700">
                    <thead>
                      <tr>
                        <th className="px-2 py-1">S.NO</th>
                        <th className="px-2 py-1">Status</th>
                        <th className="px-2 py-1">Buyer</th>
                        <th className="px-2 py-1">Date</th>
                        <th className="px-2 py-1">Payment</th>
                        <th className="px-2 py-1">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-1">{index + 1}</td>
                        <td
                          className={`px-2 py-1 ${
                            order.status === "Completed"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {order.status}
                        </td>
                        <td className="px-2 py-1">{order.buyer?.name}</td>
                        <td className="px-2 py-1">
                          {moment(order.createAt).fromNow()}
                        </td>
                        <td
                          className={`px-2 py-1 ${
                            order.payment.success
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {order.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="px-2 py-1">{order.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Product Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {order.products?.map((product) => (
                      <div
                        className="bg-white flex items-center  flex-row  border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
                        key={product._id}
                      >
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/get-photo/${product._id}`}
                          className="w-24 h-24   object-contain mx-2 rounded-t-lg"
                          alt={product.name}
                        />
                        <div className="p-1">
                          <h6 className="text-sm font-semibold">
                            {product.name}
                          </h6>
                          <small className="text-gray-600 text-xs">
                            {product.description.substring(0, 50)}...
                          </small>
                          <p  className="mt-2 text-xl font-bold">
                           Price :  ${product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
