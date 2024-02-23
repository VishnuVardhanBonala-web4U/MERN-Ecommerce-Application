import React, { useEffect, useState } from "react";

import Layout from "./Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/product-category/${params.slug}`
      );
      if (data?.success) {
        setProducts(data?.products);
        setCategory(data?.category);

        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Some thing Went Wrong");
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params.slug]);
  return (
    <>
      <Layout>
        <div className="container mt-3 category">
          <h4 className="text-center">Category - {category?.name}</h4>
          <h6 className="text-center">{products?.length} result found </h6>
          <div className="row">
            <div className="col-md-9 offset-1">
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div
                    className="card m-2"
                    key={p._id}
                    style={{ width: "15rem" }}
                  >
                    <img
                      src={`http://localhost:4000/get-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CategoryPage;
