import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [updatedName, setUpdatedName] = useState("");

  // handleSubmit function for creating new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`Category ${name} created successfully`);
        setName("");
        getCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // handleUpdate function for updating category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selectedCategory._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(data.message);
        getCategories();
        setVisible(false);
        setSelectedCategory(null);
        setUpdatedName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //handleDelete function for deleting category
  const handleDelete = async (selectedCategory) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${selectedCategory._id}`
      );
      if (data.success) {
        toast.success(data.message);
        getCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // get all categories
  const getCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (data.success) setCategories(data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <h3>Admin Dashboard</h3>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Manage Categories</h3>
            <div className="p-3">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <>
                      <tr>
                        <td key={category._id}>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.name);
                              setSelectedCategory(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(category);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => {
                setVisible(false);
              }}
              footer={null}
              visible={visible}
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

export default ManageCategories;
