import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { useCart } from "../Context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [zoomStyle, setZoomStyle] = useState({});

  // Fetch product details
  useEffect(() => {
    if (params?.slug) fetchProduct();
  }, [params?.slug]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/single-product/${params.slug}`
      );
      setProduct(data?.product);
      fetchSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Fetch similar products
  const fetchSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  // Handle zoom effect on image
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div
              className="w-full h-96 bg-center bg-cover rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/get-photo/${product._id})`,
                ...zoomStyle,
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomStyle({ backgroundSize: "200%" })}
              onMouseLeave={() => setZoomStyle({})}
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-lg mt-4 text-gray-600">{product.description}</p>
            <h6 className="text-xl mt-4">
              Price:{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <h6 className="text-lg text-gray-500 mt-2">
              Category: {product?.category?.name}
            </h6>
            <button
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to cart!");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12">
          <h4 className="text-2xl font-semibold">Similar Products</h4>
          {relatedProducts.length === 0 ? (
            <p className="text-center mt-4 text-gray-600">
              No similar products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {relatedProducts.map((p) => (
                <div
                  key={p._id}
                  className="card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/get-photo/${p._id}`}
                    alt={p.name}
                    className="rounded-t-lg h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-bold truncate">{p.name}</h5>
                    <p className="text-sm mt-2 text-gray-600">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="mt-4 flex justify-between">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        View
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart!");
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
