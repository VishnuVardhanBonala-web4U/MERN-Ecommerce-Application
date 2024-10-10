import React, { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import AdminMenu from "./AdminMenu";
import { process.env.REACT_APP_BASE_URL } from "../../config/URL";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/getall-product`);
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data.error);
      }
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Some thing Went Wrong");
    }
  };

  //lifecycle method
  /* es-lint disable next line */
  useEffect(() => {
    getAllProducts();
  }, []);

  /* Delete Product */

  const deleteProduct = async (cid) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-product/${cid}`);
      if (data?.success) {
        toast.success("Category Deleted");
      } else {
        toast.error("error in Category Delete");
      }
      getAllProducts();
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <Layout title="Ecommerce - All Products">
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2 mb-3" style={{ width: "15rem" }}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                  className="card-img-top "
                  style={{ height: "15rem" }}
                  alt={p.name}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
                <div className="d-flex justify-content-center  m-2">
                  <Link to={`/dashboard/admin/update-product/${p.slug}`}>
                    <button className="btn btn-primary mx-3 ">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger mx-3 "
                    onClick={() => {
                      deleteProduct(p._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
