import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [user] = useAuth();
  const navigate = useNavigate();

  const removeCartItem = (productId) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === productId);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      // eslint-disable-next-line array-callback-return
      cart?.map((product) => {
        total += product.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Your Cart | Mayomart">
      <div className="container">
        <div className="row">
          <h3 className="text-center">{`Hello ${
            user?.token && user?.user?.name
          }`}</h3>
          <h6 className="text-center">
            {`Your Cart currently have ${
              cart?.length > 0 ? cart?.length : "0"
            } items`}
          </h6>
          <div className="col-md-6 mt-3">
            <h4 className="text-center">Your Cart</h4>
            {cart?.map((product) => (
              <div className="row card flex-row mb-2 p-2">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "10rem", objectFit: "contain" }}
                  />
                </div>
                <div className="col-md-8">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text">
                    {product.description.substring(0, 25)}...
                  </p>
                  <p className="card-text">₹ {product.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 mt-3 text-center">
            <h4>Cart Summary</h4>
            <h6>Checkout | Total Items: {cart?.length} | Payment</h6>
            <p>Total : {totalPrice()}</p>
            {user?.user?.address ? (
              <>
                <div className="mb-3">
                  <p>Current Address: </p>
                  <p>{user?.user?.address}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Add address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
