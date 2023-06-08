import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login | Mayomart">
      <div className="register">
        <div className="register-container">
          <h3 className="register-title">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                placeholder="Email (xxx@xxx.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default Login;
