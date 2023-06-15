import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [radio, setRadio] = useState([]); // price range
  const [total, setTotal] = useState(0); // total products
  const [page, setPage] = useState(1); // page number
  const [loading, setLoading] = useState(false); // loading

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

  //get all products
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      if (data?.success) setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error loading products");
    }
  };

  //get total products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      if (data?.success) setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // handleFilter function for filtering products by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filtered products
  const getFilteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      if (data?.success) setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      if (data?.success) setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // lifecycle method
  useEffect(() => {
    getCategories();
    getTotal();
  }, []);

  //whenever we change the page number, we want to get the products
  useEffect(() => {
    if (!checked.length && !radio.length) {
      getProducts();
    }
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  //whenever we change the checked or radio state, we want to get the filtered products
  useEffect(() => {
    if (checked.length || radio.length) {
      getFilteredProducts();
    }
    //eslint-disable-next-line
  }, [checked, radio]);

  //whenever we change the page number, we want to get the products
  useEffect(() => {
    if (page === 1) return;
    loadMore();
    //eslint-disable-next-line
  }, [page]);

  return (
    <Layout title="Home | Mayomart">
      <div className="row mt-3">
        <div className="col-md-2">
          <h6 className="text-center">Filter by category</h6>
          <div className="d-flex flex-column flex-wrap p-3">
            {/* Category Filter */}
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                className="pb-2 pl-4 pr-4"
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          {/* Price Filter */}
          <h6 className="text-center">Filter by Price</h6>
          <div className="d-flex flex-column flex-wrap p-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column flex-wrap p-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                window.location.reload();
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="col-md-10 text-center">
          <h6>Products</h6>
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
          </div>
          {products?.length === 0 && (
            <h6 className="text-center">No products found</h6>
          )}
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
