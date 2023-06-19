import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const SearchResults = () => {
  const [user] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values] = useSearch();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h3>Search Results</h3>
          <h6>
            {values?.results.length < 1
              ? "No products found"
              : `Found ${values.results.length} products related to your search`}
          </h6>
          <div className="d-flex flex-wrap justify-content-center mt-4">
            {values?.results.map((product) => (
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

export default SearchResults;
