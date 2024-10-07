import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../Form/CategoryForm";
import { Modal } from "antd";
import { base_url } from "../../config/URL";
import "../css/CategoryForm.css"; // Custom CSS file

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${base_url}/create-category`, {
        name,
      });
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
      const { data } = await axios.get(`${base_url}/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  const deleteCategory = async (cid) => {
    try {
      const { data } = await axios.delete(`${base_url}/delete-category/${cid}`);
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
        `${base_url}/update-category/${selected._id}`,
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
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3 mb-4 mb-md-0">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">Manage Category</h1>
            <div className="mb-4">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="mb-4">
              <table className="table table-bordered table-striped shadow">
                <thead className="shadow">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
