import React from "react";

import Layout from "./Layout/Layout";
import { useSearch } from "../hooks/useSearch";
import { useCart } from "../Context/cart";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Searched = () => {
  const navigate = useNavigate();

  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Search Results</h1>
          <h6 className="text-lg text-gray-600 mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {values?.results.map((p) => (
            <div
              key={p._id}
              className="card  bg-white rounded-lg shadow-lg o hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-center shadow-md rounded-md px-2">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                  className="w-24  h-24 object-contain "
                  alt={p.name}
                />
              </div>
              <div className="p-2">
                <h6 className="text-xl font-semibold text-gray-800 truncate">
                  {p.name}
                </h6>
                <small className="text-gray-600 mt-1 truncate">
                  {p.description.substring(0, 30)}...
                </small>
                <p className="text-md font-semibold text-blue-600 mt-1">
                  ${p.price}
                </p>
                <div className="mt-2 flex  gap-2 justify-between items-center">
                  <button
                    className="btn btn-primary bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>

                  {/* Add to Cart Button */}

                  {auth?.user?.role === 0 &&
                    (
                      <button
                        className="btn btn-secondary bg-gray-600 text-white  px-2 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart!");
                        }}
                      >
                        ADD TO CART
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Searched;
