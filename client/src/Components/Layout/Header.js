import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SearchInput from "../Searchproduct";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../Context/cart";
import { Badge } from "antd";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [CisDropdownVisible, setCDropdownVisible] = useState(false);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };


  const toggleCDropdown = () => {
    setCDropdownVisible((prev) => !prev);
  };
  ;
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Homepage */}
        <Link
          className="text-xl font-bold text-gray-800 hover:text-blue-500"
          to="/"
        >
          Homepage
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="block lg:hidden text-gray-800 focus:outline-none"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="material-icons">menu</span>
        </button>

        {/* Navigation Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Search Input */}
          <div className="hidden sm:block">
            <SearchInput />
          </div>

          {/* Categories Dropdown */}
          <div className="relative">
            <NavLink
              to="#"
              className="text-gray-800 hover:text-blue-500 font-medium"
              onClick={toggleCDropdown} // Toggle dropdown on click
            >
              All Categories
            </NavLink>

            {CisDropdownVisible && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10">
                <ul>
                  <li>
                    <Link
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      to="/"
                      onClick={() => setDropdownVisible(false)} // Close dropdown after clicking
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        to={`/category/${c.slug}`}
                        onClick={() => setDropdownVisible(false)} // Close dropdown after clicking
                      >
                        {c?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Authentication Links */}
          {!auth?.user ? (
            <>
              <Link
                className="text-gray-800 hover:text-blue-500 font-medium"
                to="/register"
              >
                Register
              </Link>
              <Link
                className="text-gray-800 hover:text-blue-500 font-medium"
                to="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative">
              <NavLink
                to="#"
                className="text-gray-800 hover:text-blue-500 font-medium"
                onClick={toggleDropdown}
              >
                {auth?.user?.name}
              </NavLink>

              {isDropdownVisible && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10">
                  <ul>
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 0 ? "user" : "admin"
                        }`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setDropdownVisible(false)} // Close dropdown after click
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
                          setDropdownVisible(false); // Close dropdown after logout
                        }}
                        to="/login"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Cart or Admin Products */}
          {auth?.user?.role === 1 ? (
            <Link
              className="text-gray-800 hover:text-blue-500 font-medium"
              to="/dashboard/admin/products"
            >
              Products
            </Link>
          ) : (
            <Link
              className="relative text-gray-800 hover:text-blue-500 font-medium"
              to="/dashboard/user/cart"
            >
              <div className="relative inline-block text-center">
                <span className="text-md text-gray-800">Cart</span>
                <span className="absolute max-h-5 text-center -top-2 -right-5 bg-red-600 text-white font-bold rounded-full px-2 py-1 text-xs">
                  {cart?.length > 0 ? cart.length : 0}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
