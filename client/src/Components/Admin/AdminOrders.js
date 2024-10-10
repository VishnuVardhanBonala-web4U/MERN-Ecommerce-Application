import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import Layout from "../Layout/Layout";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../Context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/all-orders`);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-8">
            <h1 className="text-center mb-4">All Orders</h1>
            {orders?.map((o, i) => (
              <div className="border rounded shadow-sm mb-4">
                <table className="table table-striped table-responsive">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                          style={{ width: "100%" }}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container col-md-12">
                  {o?.products?.map((p) => (
                    <div
                      className="row  mb-2 p-3 card flex-row align-items-center"
                      key={p._id}
                    >
                      <div className="col-md-3 col-sm-12">
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                          className="card-img-top img-fluid"
                          alt={p.name}
                        />
                      </div>
                      <div className="col-md-8 col-sm-12">
                        <p>
                          <strong>{p.name}</strong>
                        </p>
                        <p>{p.description.substring(0, 30)}...</p>
                        <p>Price: ${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
