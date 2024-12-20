import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import toast from "react-hot-toast";
import { useCart } from "../Context/cart";

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
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get-category`
      );
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getall-product`
      );
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
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/filter-product`,
        {
          checked,
          radio,
        }
      );
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
    <Layout title="All Products - Best Offers">
      <h4 className="text-center text-gray-600 my-3 font-semibold">
        Welcome to Homepage
      </h4>
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-12 gap-2 ">
          {/* Filters Section */}
          <div
            className={`col-span-12 md:col-span-3 lg:col-span-2 bg-gray-50 p-1 rounded shadow-md transition-transform duration-300 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <h5 className="text-center font-bold mb-4">Filter Products</h5>
            <button
              className="btn-primary md:hidden mb-3"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            <div>
              <h6 className="font-semibold mb-2">Filter By Category</h6>
              <div className="space-y-2">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className="text-gray-700"
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h6 className="font-semibold mb-2">Filter By Price</h6>
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                className="space-y-2"
              >
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array} className="text-gray-700">
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-span-12  md:col-span-9 lg:col-span-10">
            <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="bg-white  shadow-md rounded-lg p-2 flex flex-col items-center hover:shadow-lg transition-all "
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                    alt={p.name}
                    className="object-contain  shadow-sm  rounded-md mb-2"
                    style={{ maxHeight: "4rem" }}
                  />
                  <h6 className="font-bold text-sm text-center ">{p.name}</h6>
                  <small className="text-xs text-gray-600 text-center line-clamp-1">
                    {p.description}
                  </small>
                  <div className="flex justify-between items-center w-full mt-2">
                    <h6 className="text-green-500 font-semibold text-sm">
                      ${p.price}
                    </h6>
                    <h6 className="text-gray-500 text-sm">
                      ₹{(p.price * 83).toFixed(2)}
                    </h6>
                  </div>
                  <div className="flex gap-2 w-full items-center   mt-1">
                    <button
                      className="bg-gray-400 text-white text-xs py-1 px-2 rounded hover:bg-gray-600 w-full"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 w-full"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item added to cart!");
                      }}
                    >
                      Add to Cart
                    </button>
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
