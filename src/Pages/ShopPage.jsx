import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/Shop.css";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products/");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Our Products</h2>
      {error && <p className="error">{error}</p>}
      <div className="products-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              className="product-img"
              onClick={() => handleProductClick(item.id)}
            />
            <h3 className="product-name">{item.name}</h3>
            <p className="product-category">
              {item.category?.name || "Unknown"}
            </p>
            <div className="product-price">
              {item.old_price && (
                <span className="old-price">
                  ${parseFloat(item.old_price).toFixed(2)}
                </span>
              )}
              <span className="new-price">
                ${parseFloat(item.price).toFixed(2)}
              </span>
            </div>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
