import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getRelatedProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get Related Products
  const getRelatedProducts = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-related-products/${productId}/${categoryId}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
    //eslint-disable-next-line
  }, [params?.slug]);
  return (
    <Layout>
      <h3 className="mt-2 text-center">{product?.name}</h3>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
            alt={product.name}
            className="card-img-top img-fluid"
            style={{ height: "20rem", objectFit: "contain" }}
          />
        </div>
        <div className="d-flex flex-column justify-content-center  col-md-6">
          <p>
            Description: <br /> {product.description}
          </p>
          <p>
            Category: <br /> {product.category?.name}
          </p>
          <p>Shipping Available: {product.shipping ? "Yes" : "No"}</p>
          <p>Quantity Available: {product.quantity}</p>
          <p
            style={{
              color: "red",
            }}
          >
            <br />₹ {product.price}
          </p>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
      <h4 className="text-center mt-2">Similar Products</h4>
      <div className="row mt-2">
        <div className="d-flex flex-wrap justify-content-center">
          {relatedProducts?.map((product) => (
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
                <button className="btn btn-primary">Add to cart</button>
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
          {relatedProducts?.length === 0 && (
            <h6 className="text-center">No Similar Products Found</h6>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
