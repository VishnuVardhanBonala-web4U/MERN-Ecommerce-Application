import React from "react";
import Layout from "../Components/Layout/Layout";
import "../Components/css/About.css";
const About = () => {
  return (
    <Layout title="About us ">
      <h1 className="text-center">About US </h1>
      <div className="d-flex about " style={{ minHeight: "80vh" }}>
        <div className="float-start m-2 p-2  container">
          <h2 className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            debitis. Velit soluta totam quia magnam.
          </h2>
        </div>

        <div className="float-end about_right container">
          <img
            src="https://cdn.pixabay.com/photo/2017/08/05/00/12/girl-2581913_1280.jpg"
            className="rounded mx-auto d-block  float-end"
            alt="EcommerceImage Here"
          />
        </div>
        <br />
      </div>
    </Layout>
  );
};

export default About;
