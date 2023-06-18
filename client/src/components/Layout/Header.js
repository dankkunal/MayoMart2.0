import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import SearchInput from "../Forms/SearchInput";
import useCategory from "../../hooks/useCategory";

const Header = () => {
  const [user, setUser] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setUser({
      ...user,
      user: null,
      token: "",
    });
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={"/"} className="navbar-brand">
              MayoMart
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to={"/home"} className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to={"/categories"}
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={"/categories"} className="dropdown-item">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((category) => (
                    <li key={category._id}>
                      <Link
                        to={`/category/${category.slug}`}
                        className="dropdown-item"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {user.user ? (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      to={"/dashboard"}
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            user?.user?.isAdmin ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/login"}
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/cart"} className="nav-link">
                      Cart (0)
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to={"/register"} className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
