import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import { BiSearchAlt } from "react-icons/bi";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.keyword.trim()) {
      // If search input is empty, show an alert or any feedback UI
      alert("Please enter a search term.");
      return;
    }

    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL || "http://localhost:5000"
        }/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log("Search error:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto  ">
      <form
        className="flex items-center bg-white rounded-lg shadow-md overflow-hidden"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-grow p-2   text-gray-700 bg-gray-100 border-none   focus:outline-none rounded-l-lg"
          type="search"
          placeholder="Search Products..."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        {values?.keyword.trim() && (
          <button
            className="bg-gray-400 text-center text-white  rounded-r-lg hover:bg-gray-600 "
            type="submit"
          >
            <div className="flex items-center justify-center py-2 text-center">
              <span className="flex items-center space-x-1">
                {" "}
                {/* This adds space between text and icon */}
                <span className="text-center ml-2">Search</span>
               
                  <BiSearchAlt  />
              </span>
            </div>
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
