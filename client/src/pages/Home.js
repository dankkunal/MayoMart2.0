import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [user] = useAuth();
  return (
    <Layout title="Home | Mayomart">
      <h1>Homepage</h1>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
