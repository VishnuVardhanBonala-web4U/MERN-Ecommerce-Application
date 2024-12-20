import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { Select } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, Setcategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get-category`
      );
      if (data?.success) {
        Setcategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/create-product`,
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <Layout title="Admin - CreateProduct">
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row">
          {/* Admin Menu */}
          <div className="md:w-1/4 p-4">
            <AdminMenu />
          </div>

          {/* Product Creation Form */}
          <div className="md:w-3/4 p-4 space-y-6">
            <h1 className="text-3xl font-semibold text-center text-indigo-600">
              Create Product
            </h1>
            {/* Category Select */}
            <div className="mb-2">
              <Select
                placeholder="Select Category"
                size="large"
                showSearch
                allowClear
                className="w-full"
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            {/* Product Photo Upload */}
            <div className="mb-4 hover:text-black">
              {/* Styled file input */}
              <div className="border-2 bg-gray-50 border-dashed border-blue-200 p-2 rounded-md text-center cursor-pointer hover:bg-blue-100 hover:border-black ">
                <label className="block text-gray-600 text-lg ">
                  <span className="text-sm text-gray-400 hover:text-black  hover:font-semibold">
                    Click to upload Product Image
                  </span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden "
                  />
                </label>
              </div>

              {/* Preview the selected image */}
              {photo && (
                <div className="mt-4 text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                    className="w-48 h-48 object-cover mx-auto rounded-lg shadow-lg"
                  />
                  <p className="mt-2 text-gray-600">{photo.name}</p>
                </div>
              )}
            </div>
            {/* Product Name */}
            <div className="mb-2">
              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Product Description */}
            <div className="mb-2">
              <textarea
                value={description}
                placeholder="Enter product description"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* Product Price */}
            <div className="mb-2">
              <input
                type="number"
                value={price}
                placeholder="Enter price"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* Product Quantity */}
            <div className="mb-2">
              <input
                type="number"
                value={quantity}
                placeholder="Enter quantity"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            {/* Shipping Option */}
            <div className="mb-2">
              <small className="text-sm text-gray-500">Select Availability </small>
              <Select
                placeholder="Select Shipping"
                size="large"
                value={shipping}
                className="w-full"
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            {/* Submit Button */}
            <div className="mb-2">
              <button
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
