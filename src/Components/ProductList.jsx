import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem.jsx";
import API_BASE_URL from "../constant/backend_url.jsx";

function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${API_BASE_URL}/products/`);
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category === parseInt(selectedCategory)
      )
    : products;

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
