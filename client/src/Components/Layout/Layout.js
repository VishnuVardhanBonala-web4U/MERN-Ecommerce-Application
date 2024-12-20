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

      {/* Header */}
      <div className="sticky top-0 z-30">
        <Header />
      </div>

      {/* Main Content Area */}
      <main className="min-h-[80vh] bg-gray-100 flex flex-col items-center justify-center shadow-lg p-4">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-full max-w-7xl bg-white rounded-md shadow-md p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "ShopNow | Ecommerce-App",
  description:
    "Discover great deals on electronics, fashion, and more at Ecommerce-App. Shop now for the latest trends and best prices!",
  keywords:
    "electronics, fashion, online shopping, deals, discounts, Ecommerce-App",
  author: "Ecommerce-App Team",
};

export default Layout;
