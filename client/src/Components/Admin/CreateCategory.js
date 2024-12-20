import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  const deleteCategory = async (cid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/delete-category/${cid}`
      );
      if (data?.success) {
        toast.success("Category Deleted");
        getAllCategory();
      } else {
        toast.error("Error in Category Delete");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title="Admin - Create Category">
      <div className="container mx-auto p-6 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap">
          {/* Admin Menu */}
          <div className="w-full md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-4/5 ">
            <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
              Manage Category
            </h1>
            <div className="mb-6">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            {/* Category Table */}
            <div className="mx-7 container shadow-lg rounded-lg">
              <table className=" rounded-md w-full  bg-white text-sm text-gray-800 font-semibold">
                <thead className=" rounded-md bg-gray-500 text-white">
                  <tr className="rounded-md">
                    <th className="py-3 px-4  text-left">Name</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id} className="border-b hover:bg-gray-50 rounded-md">
                      <td className="py-1 px-3">{c.name}</td>
                      <td className="py-1 px-3 text-center">
                        <button
                          className="px-3 py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition duration-200"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                          onClick={() => deleteCategory(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Update Category */}
      <Modal
        title="Update Category"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        className="update-category-modal"
      >
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </Layout>
  );
};

export default CreateCategory;
