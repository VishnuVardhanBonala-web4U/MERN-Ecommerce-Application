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
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders`);
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
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Orders</h1>
            {orders?.map((order, index) => (
              <div
                className="border rounded shadow-sm mb-4 p-3 order-card"
                key={order._id}
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S.NO</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td
                        className={`text-${order.status === "Completed" ? "success" : "danger"
                          }`}
                      >
                        {order.status}
                      </td>
                      <td>{order.buyer?.name}</td>
                      <td>{moment(order.createAt).fromNow()}</td>
                      <td
                        className={`text-${order.payment.success ? "success" : "danger"
                          }`}
                      >
                        {order.payment.success ? "Success" : "Failed"}
                      </td>
                      <td>{order.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="row">
                  {order.products?.map((product) => (
                    <div className="col-md-4 mb-3" key={product._id}>
                      <div className="card">
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/get-photo/${product._id}`}
                          className="card-img-top object-fit-fill"
                          alt={product.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">
                            {product.description.substring(0, 50)}...
                          </p>
                          <p className="card-text">
                            <strong>Price: </strong>${product.price}
                          </p>
                        </div>
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

export default Orders;
