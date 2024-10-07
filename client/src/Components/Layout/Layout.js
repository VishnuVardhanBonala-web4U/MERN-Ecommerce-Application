import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <main className="vh-80" style={{ minHeight: "80vh" }}>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "ShopNow  | Ecommerce-App",
  description:
    "Discover great deals on electronics, fashion, and more at Ecommerce-App. Shop now for the latest trends and best prices!",
  keywords:
    "electronics, fashion, online shopping, deals, discounts, Ecommerce-App",
  author: "Ecommerce-App Team",
};

export default Layout;
