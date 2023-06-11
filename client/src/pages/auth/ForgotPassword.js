import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, answer, newPassword }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title="Reset Password | Mayomart">
      <div className="forgot-password">
        <div className="forgot-password-container">
          <h3>Reset Password</h3>
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
                placeholder="Who is your favorite Singer?"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputAnswer1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Enter new password here"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
                minLength={8}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
