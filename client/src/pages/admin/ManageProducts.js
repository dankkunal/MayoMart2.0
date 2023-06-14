import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      if (data?.success) setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error loading products");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
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
            <h3 className="text-center">Products</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {products?.map((product) => (
                <Link
                  className="text-decoration-none product-link"
                  to={`/dashboard/admin/product/${product.slug}`}
                  key={product._id}
                >
                  <div
                    className="card m-2"
                    style={{ width: "18rem", height: "30rem" }}
                    key={product._id}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "20rem", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 25)}...
                      </p>
                      <p className="card-text">₹ {product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
