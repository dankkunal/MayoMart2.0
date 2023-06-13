import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(""); // for select
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get all categories
  const getCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (data?.success) setCategories(data?.categories);
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  //getProduct function for getting product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      if (data?.success) {
        setName(data?.product.name);
        setId(data?.product._id);
        setDescription(data?.product.description);
        setPrice(data?.product.price);
        setQuantity(data?.product.quantity);
        setShipping(data?.product.shipping);
        setCategory(data?.product.category._id);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading product");
    }
  };

  //handleUpdate function for creating product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(`${name} updated successfully`);
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setShipping("");
        setPhoto("");
        navigate("/dashboard/admin/manage-products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //handleDelete function for deleting product
  const handleDelete = async (e) => {
    e.preventDefault();
    let answer = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!answer) return;
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(`${name} deleted successfully`);
        navigate("/dashboard/admin/manage-products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getProduct();
    //eslint-disable-next-line
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
            <h3>Update Product</h3>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder={"Select a category"}
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    {" "}
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    {" "}
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${id}`}
                      alt={photo.name}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  placeholder="Enter product description"
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Enter product quantity"
                  value={quantity}
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "1" : "0"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary col-md-12 mb-2"
                  onClick={handleUpdate}
                >
                  Update product
                </button>
                <button
                  className="btn btn-danger col-md-12"
                  onClick={handleDelete}
                >
                  Delete product
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
