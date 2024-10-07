import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "../config/URL";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${base_url}/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
