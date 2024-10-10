import React, { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  const getProductByCat = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/product-category/${slug}`);
      if (data?.success) {
        setProducts(data?.products || []);
        setCategory(data?.category || {});
        toast.success(data?.message || "Data fetched successfully");
      } else {
        toast.error(data?.error || "Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Set loading to false after the fetch completes
    }
  };

  useEffect(() => {
    if (slug) getProductByCat();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>; // Display loading text
  }

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products.length} result(s) found</h6>
        <div className="row">
          <div className="col-md-9 offset-md-1">
            <div className="d-flex flex-wrap">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="card m-2"
                    key={product._id}
                    style={{ width: "18rem" }} // Adjusted width for better readability
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/get-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <h5 className="card-title card-price">
                        {product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                      <p className="card-text">
                        {product.description.length > 60
                          ? product.description.substring(0, 60) + "..."
                          : product.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No products found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
