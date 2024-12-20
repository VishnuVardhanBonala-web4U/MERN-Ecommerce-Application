import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../Layout/Layout";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../Context/AuthContext";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show a loading indicator
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or error occurred
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/order-status/${orderId}`,
        { status: value }
      );
      getOrders(); // Refresh orders after status change
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/4 mb-4">
            <AdminMenu />
          </div>
          <div className="w-full lg:w-3/4">
            <h1 className="text-2xl font-semibold text-center mb-6">
              All Orders
            </h1>
            {loading ? (
              <div className="text-center text-lg">Loading...</div> // Loading indicator
            ) : (
              orders?.map((o, i) => (
                <div
                  key={o._id}
                  className="border mx-4 border-gray-300 rounded-lg shadow-lg mb-2 p-2"
                >
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 text-left">#</th>
                        <th className="px-2 py-1 text-left">Status</th>
                        <th className="px-2 py-1 text-left">Buyer</th>
                        <th className="px-2 py-1 text-left">Date</th>
                        <th className="px-2 py-1 text-left">Payment</th>
                        <th className="px-2 py-1 text-left">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-1">{i + 1}</td>
                        <td className="px-2 py-1">
                          <select
                            className="w-full py-1 px-3 border border-gray-300 rounded-md"
                            onChange={(e) =>
                              handleChange(o._id, e.target.value)
                            }
                            defaultValue={o?.status}
                          >
                            {status.map((s, index) => (
                              <option key={index} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-2 py-1">{o?.buyer?.name}</td>
                        <td className="px-2 py-1">
                          {moment(o?.createdAt).fromNow()}
                        </td>
                        <td className="px-2 py-1">
                          {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="px-2 py-1">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4">
                    {o?.products?.map((p) => (
                      <div
                        key={p._id}
                        className="flex flex-wrap items-center mb-2 p-2 border border-gray-300 rounded-lg"
                      >
                        <div className="w-1/3 md:w-1/4 mb-2 md:mb-0">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                            alt={p.name}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-2/3 md:w-3/4 pl-4">
                          <p className="font-semibold">{p.name}</p>
                          <p className="text-gray-600">
                            {p.description.substring(0, 30)}...
                          </p>
                          <p className="text-lg font-semibold">
                            Price: ${p.price}
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

export default AdminOrders;
