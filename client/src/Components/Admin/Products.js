import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import AdminMenu from "./AdminMenu";

const Products = () => {
  const [products, setProducts] = useState([]);
const  navigate  = useNavigate();
  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getall-product`
      );
      if (data?.success) {

        setProducts(data.products);
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Delete product
  const deleteProduct = async (cid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/delete-product/${cid}`
      );
      if (data?.success) {
        toast.success("Product Deleted");
        getAllProducts();
      } else {
        toast.error("Error in product delete");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Ecommerce - All Products">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 p-4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4 p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">
              All Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="card bg-white shadow-lg rounded-lg "
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-48 object-cover p-2 rounded-lg "
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                    <p className="text-gray-600 mb-4">{p.description}</p>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/dashboard/admin/update-product/${p.slug}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
