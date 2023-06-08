import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, phone, address, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register | Mayomart">
      <div className="register">
        <div className="register-container">
          <h3 className="register-title">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="nameHelp"
                required
              />
            </div>
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
                placeholder="Phone (xxx-xxx-xxxx)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputPhone"
                aria-describedby="phoneHelp"
                required
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputAddress"
                aria-describedby="addressHelp"
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
                minLength="8"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default Register;
