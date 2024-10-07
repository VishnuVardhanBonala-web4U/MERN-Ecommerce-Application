import React from "react";
import Layout from "../Components/Layout/Layout";
import "../Components/css/About.css";
const Contact = () => {
  return (
    <Layout title="Contact us">
      <h1 className="text-center">Contact US </h1>
      <div className="d-flex about " style={{ minHeight: "80vh" }}>
        <div className="float-start  list w-100 ">
          <ul className="list-group shadow">
            <h4
              className="list-group-item  text-center text-info "
              aria-current="true"
            >
              Our Marketing Addressing is :
            </h4>
            <h4 className="list-group-item">152 A Charlotte streeet</h4>
            <h4 className="list-group-item">United states of America</h4>
            <h4 className="list-group-item">Phone: 874-343-343983-34</h4>
            <h4 className="list-group-item">We are 24/7 Available</h4>
          </ul>
        </div>

        <div className="float-end about_right container">
          <img
            src="https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000_1280.jpg"
            className="rounded mx-auto d-block   shadow "
            alt="EcommerceImage Here"
          />
        </div>
        <br />
      </div>
    </Layout>
  );
};

export default Contact;
