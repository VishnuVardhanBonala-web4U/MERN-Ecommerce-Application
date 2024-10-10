import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import toast from "react-hot-toast";
import { useCart } from "../Context/cart";

import "./css/Homepage.css";

const Homepage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/getall-product`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products", error);
    }
  };

  // Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/filter-product`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.error("Error filtering products", error);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  return (
    <Layout title="All Products - Best offers">
      <h4 className="text-center text-muted my-4">Welcome to Homepage</h4>
      <div className="container-fluid">
        <div className="row">
          {/* Filters section */}
          <div className={`col-lg-2 col-md-3 col-12 mb-4 filter-section ${showFilters ? "show" : ""}`}>
            <h5 className="text-center mb-4">Filter Products</h5>
            <button
              className="btn btn-primary d-lg-none mb-3"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            <div className="filters-container">
              <h6>Filter By Category</h6>
              <div className="d-flex flex-column shadow-sm p-2 rounded">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className="mb-2"
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>

              <h6 className="mt-4">Filter By Price</h6>
              <div className="d-flex flex-column shadow-sm p-2 rounded">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array} className="mb-2">
                        {p.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
          </div>

          {/* Products section */}
          <div className="col-lg-10 col-md-9 col-12">
            <div className="row">
              {products?.map((p) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
                  key={p._id}
                >
                  <div className="card shadow-sm" style={{ minHeight: "20rem" }}>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                      className="card-img-top p-2"
                      alt={p.name}
                      style={{ height: "10rem", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <div className="d-flex justify-content-between">
                        <p className="card-text">$ {p.price}</p>
                        <p className="card-text">RS {p.price * 83}</p>
                      </div>
                      <div className="d-flex w-100 btn_container">
                        <button
                          className="btn btn-info shadow-lg fs-10"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item Added to cart");
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
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

export default Homepage;
