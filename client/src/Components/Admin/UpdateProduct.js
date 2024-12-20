import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import AdminMenu from "./AdminMenu";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/single-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        getSingleProduct();
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 p-4">
            <AdminMenu />
          </div>
          <div className="w-full bg-gray-50 shadow-lg md:w-3/4 p-6 rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Update Product
            </h1>
            <div className="max-w-lg mx-auto">
              {/* Category Dropdown */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full p-2 border  bg-white rounded-md shadow-sm"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* Photo Upload */}
              <div className="mb-2">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                {photo ? (
                  <div className="text-center mb-2">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="h-48 w-auto mx-auto shadow-md hover:shadow-lg rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-center mb-2">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/get-photo/${id}`}
                      alt="product_photo"
                      className="h-44 object-contain w-auto mx-auto shadow-md hover:shadow-lg rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Product Name */}
              <div className="mb-2">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="w-full p-2 border rounded-md shadow-sm"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Product Description */}
              <div className="mb-2">
                <textarea
                  value={description}
                  placeholder="Product Description"
                  className="w-full p-2 border rounded-md shadow-sm"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Product Price */}
              <div className="mb-2">
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="w-full p-2 border rounded-md shadow-sm"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Product Quantity */}
              <div className="mb-2">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="w-full p-2 border rounded-md shadow-sm"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Shipping Options */}
              <div className="mb-2">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="w-full bg-white p-2 border rounded-md shadow-sm"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "yes" : "no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Update Button */}
              <div className="mb-2">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-all"
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
