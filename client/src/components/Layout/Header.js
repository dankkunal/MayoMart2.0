import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const Header = () => {
  const [user, setUser] = useAuth();
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
              <li className="nav-item">
                <NavLink to={"/home"} className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/categories"}
                  className="nav-link"
                  aria-current="page"
                >
                  Categories
                </NavLink>
              </li>
              {user.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/cart"} className="nav-link">
                      Cart (0)
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={"/"}
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Logout
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
