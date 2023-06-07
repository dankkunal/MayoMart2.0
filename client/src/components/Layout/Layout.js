import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

export const Layout = (props) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "80vh" }}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
