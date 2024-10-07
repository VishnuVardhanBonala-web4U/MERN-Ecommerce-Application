import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import { useCart } from "../Context/cart";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/AuthContext";
import { base_url } from "../config/URL";
import "./css/CartPage.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = cart?.reduce((acc, item) => acc + item.price, 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get Braintree token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${base_url}/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${base_url}/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);

      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page container mt-4 mb-5">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="mb-2">
              {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
            </h1>
            <p>
              {cart?.length
                ? `You have ${cart.length} item${
                    cart.length > 1 ? "s" : ""
                  } in your cart ${
                    auth?.token ? "" : "please login to checkout!"
                  }`
                : "Your cart is empty"}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-12">
            {cart?.map((p) => (
              <div className="card mb-3 d-flex flex-row" key={p._id}>
                <div className="card-img-container">
                  <img
                    src={`${base_url}/get-photo/${p._id}`}
                    className="card-img"
                    alt={p.name}
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-price">
                      Price:{" "}
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4 col-12 cart-summary">
            <h2>Cart Summary</h2>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}

            {clientToken && auth?.token && cart?.length > 0 && (
              <div className="mt-3">
                <DropIn
                  options={{ authorization: clientToken }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
