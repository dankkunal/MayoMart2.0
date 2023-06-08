import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <Layout title="Policy | Mayomart">
      <div className="pnf">
        <h1 className="pnf-title">Privacy Policy</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/home" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Policy;
