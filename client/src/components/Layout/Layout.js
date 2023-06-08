import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

export const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {props.children}
      </main>

      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Mayomart 2.0",
  description: "Ecommerce Application",
  keywords: "Ecommerce, Shopping, Online Shopping",
};

export default Layout;
