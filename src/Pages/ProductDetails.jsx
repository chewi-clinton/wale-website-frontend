import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { useCart } from "../context/CartContext";
import "../style/ProductDetails.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}/`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${product.name} added to cart!`);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail-container">
      {/* Left Side: Image */}
      <div className="product-image">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
        />
      </div>

      {/* Right Side: Product Info */}
      <div className="product-info">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>

        <div className="quantity-cart">
          <div className="quantity-control">
            <button onClick={decreaseQty}>−</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>

        <div className="wishlist-share">
          <button className="wishlist-btn" onClick={toggleWishlist}>
            <span className={`wishlist-icon ${isWishlist ? "filled" : ""}`}>
              {isWishlist ? "♥" : "♡"}
            </span>{" "}
            Add to Wishlist
          </button>
        </div>

        <p className="category">
          <strong>Category:</strong> {product.category_name || "Unknown"}
        </p>
      </div>

      {/* Bottom: Description Section */}
      <div className="product-description">
        <h3>Description</h3>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
