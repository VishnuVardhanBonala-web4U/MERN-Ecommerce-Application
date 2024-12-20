import React, { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  const getProductByCat = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product-category/${slug}`
      );
      if (data?.success) {
        setProducts(data?.products || []);
        setCategory(data?.category || {});
        toast.success(data?.message || "Data fetched successfully");
      } else {
        toast.error(data?.error || "Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) getProductByCat();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h4 className="text-center text-2xl font-bold mb-4">
          Category: {category?.name}
        </h4>
        <h6 className="text-center text-lg text-gray-600 mb-8">
          {products.length} result(s) found
        </h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                key={product._id}
              >
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/get-photo/${product._id}`}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h5>
                  <h5 className="text-blue-600 font-bold mt-2">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                  <p className="text-gray-600 mt-2 text-sm">
                    {product.description.length > 60
                      ? product.description.substring(0, 60) + "..."
                      : product.description}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="block bg-blue-500 text-white text-center mt-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
