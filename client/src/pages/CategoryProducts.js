import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const CategoryProducts = () => {
  const [user] = useAuth();
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart();

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-category-products/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.slug) getProductsByCategory();
    //eslint-disable-next-line
  }, [params.slug]);
  return (
    <Layout title={`${category.name} | Mayomart`}>
      <div className="container mt-2">
        <h3 className="text-center">{category?.name}</h3>
        <h6 className="text-center">Total Products: {products?.length}</h6>
        <div className="row text-center">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((product) => (
              <div
                className="card m-2"
                style={{ width: "18rem", height: "35rem" }}
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
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (!user?.token) {
                        toast.error("Please login to add items to cart.");
                        return navigate("/login");
                      }
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item added to cart.");
                    }}
                  >
                    Add to cart
                  </button>
                  <br />
                  <button
                    className="btn btn-secondary mt-2"
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                    }}
                  >
                    More Details
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

export default CategoryProducts;
