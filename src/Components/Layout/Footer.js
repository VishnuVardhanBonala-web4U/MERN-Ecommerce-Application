import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer w-100 text-light   bg-dark shadow">
        <h5 className=" w-100 text-center">All &copy; 2024 Rights Reserved </h5>
        <div className="justify-content-center d-flex   align-items-center">
          {/* links through footer */}

          <Link className="" to="/">
            | Homepage |
          </Link>
          <Link className="" to="/about">
            About-us |
          </Link>
          <Link className=" " to="/contact">
            Contact |
          </Link>
          <Link className="" to="/policy">
            Policy |
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
