import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <h3>User Dashboard</h3>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3>User Details</h3>
            <h5>Name: {auth?.user?.name}</h5>
            <h5>Email: {auth?.user?.email}</h5>
            <h5>Phone: {auth?.user?.phone}</h5>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
