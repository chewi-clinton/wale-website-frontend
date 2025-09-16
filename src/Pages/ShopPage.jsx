import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryFilter from "../Components/CategoryFilter.jsx";
import ProductList from "../Components/ProductList.jsx";
import API_BASE_URL from "../constant/backend_url.jsx";

function ShopPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`${API_BASE_URL}/categories/`);
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Shop</h2>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
}

export default ShopPage;
