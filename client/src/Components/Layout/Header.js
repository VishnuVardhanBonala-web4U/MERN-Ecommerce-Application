import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SearchInput from "../Searchproduct";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../Context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Homepage
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <SearchInput />
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ border: "none" }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu shadow">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 0 ? "user" : "admin"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => {
                          setAuth({ user: null, token: "" });
                          localStorage.removeItem("auth");
                          navigate("/login");
                        }}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {auth?.user?.role === 1 ? (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/admin/products">
                  Products
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/user/cart">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
