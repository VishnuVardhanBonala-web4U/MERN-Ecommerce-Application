import React from "react";
import Layout from "../Components/Layout/Layout";
import "../Components/css/About.css";
const Policy = () => {
  return (
    <Layout title="Privacy Policy">
      <h1 className="text-center">Policy & Privacy </h1>
      <div className="d-flex about " style={{ minHeight: "80vh" }}>
        <div className="float-start  list w-100 ">
          <ul className="list-group shadow">
            <h6
              className="list-group-item text-center text-info "
              aria-current="true"
            >
              Policy & Privacy Info
            </h6>
            <h6 className="list-group-item">
              Information Collection: We collect only the necessary personal
              information required to process your orders and improve your
              shopping experience.
            </h6>
            <h6 className="list-group-item">
              Your Rights: You have the right to access, update, or delete your
              personal data at any time. You can also opt-out of marketing
              communications.
            </h6>

            <h6 className="list-group-item">
              Policy Updates: We may update our privacy policy periodically to
              reflect any changes in our practices or legal requirements.
            </h6>
          </ul>
        </div>

        <div className="float-end about_right container">
          <img
            src="https://termshub.io/v3/assets/images/products/privacy_policy_hero.svg"
            className="rounded mx-auto d-block   shadow "
            alt="EcommerceImage Here"
          />
        </div>
        <br />
      </div>
    </Layout>
  );
};

export default Policy;
