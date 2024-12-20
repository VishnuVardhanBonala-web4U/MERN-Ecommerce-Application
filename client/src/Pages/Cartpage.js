import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import { useCart } from "../Context/cart";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/AuthContext";

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
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/braintree/token`
      );
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
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
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
      <div className="cart-page container mx-auto mt-4 mb-5">
        <div className="row mb-4 text-center">
          <div className="col-12">
            <h1 className="text-3xl font-semibold mb-2">
              {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
            </h1>
            <p className="text-lg text-gray-700">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            {cart?.map((p) => (
              <div
                className="card mb-3 flex flex-row bg-white shadow-lg rounded-lg overflow-scroll"
                key={p._id}
              >
                <div className="w-32 h-32 bg-gray-200">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                    className="w-full h-full object-contain"
                    alt={p.name}
                  />
                </div>
                <div className="p-2 flex flex-col justify-between w-full">
                  <div>
                    <h5 className="text-md font-semibold">{p.name}</h5>
                    <p className="text-xs text-gray-500">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="mt-2 text-md font-bold text-gray-700">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <button
                    className="mt-2 w-32 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold">Cart Summary</h2>
            <hr className="my-2 border-gray-300" />
            <h4 className="text-lg font-semibold">Total: {totalPrice()}</h4>

            {auth?.user?.address ? (
              <div className="mb-3">
                <h4 className="text-md font-semibold">Current Address</h4>
                <h5 className="text-sm text-gray-600">{auth?.user?.address}</h5>
                <button
                  className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}

            {clientToken && auth?.token && cart?.length > 0 && (
              <div className="mt-4">
                <DropIn
                  options={{ authorization: clientToken }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition"
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
