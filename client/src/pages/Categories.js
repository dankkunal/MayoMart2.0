import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title="Categories | Mayomart">
      <div className="container">
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-6" key={category._id}>
              <Link
                to={`/category/${category.slug}`}
                className="btn btn-primary m-2"
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
