import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useAuth();
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        { name, email, phone, address, password }
      );
      if (data.success) {
        setUser({ ...user, user: data?.updatedUser });
        let ls = localStorage.getItem("user");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("user", JSON.stringify(ls));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const { name, email, phone, address } = user?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [user?.user]);

  return (
    <Layout title="Profile | Mayomart">
      <div className="container-fluid m-3 p-3">
        <h3>User Dashboard</h3>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3>Update Profile</h3>
            <div className="col-md-6">
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
                    disabled
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
                    placeholder="Enter your password"
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
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
