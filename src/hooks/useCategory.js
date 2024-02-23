import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/get-category");
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
