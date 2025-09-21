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
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}/`);
        setProduct(response.data);
        if (response.data.variants && response.data.variants.length > 0) {
          setSelectedVariant(response.data.variants[0]);
        }
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
    if (product && selectedVariant) {
      addToCart({
        ...product,
        selectedVariant,
        quantity,
      });
      alert(`${product.name} (${selectedVariant.name}) added to cart!`);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h2 className="product-title">{product.name}</h2>

        {product.variants && product.variants.length > 0 && (
          <div className="variant-selection">
            <h3>Select Variant:</h3>
            <div className="variant-options">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`variant-btn ${
                    selectedVariant && selectedVariant.id === variant.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.name} - ${parseFloat(variant.price).toFixed(2)}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedVariant && (
          <p className="product-price">
            ${parseFloat(selectedVariant.price).toFixed(2)}
            {selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
              <span className="low-stock">
                Only {selectedVariant.stock} left in stock!
              </span>
            )}
            {selectedVariant.stock === 0 && (
              <span className="out-of-stock">Out of stock</span>
            )}
          </p>
        )}

        <div className="quantity-cart">
          <div className="quantity-control">
            <button
              onClick={decreaseQty}
              disabled={!selectedVariant || selectedVariant.stock === 0}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={increaseQty}
              disabled={
                !selectedVariant ||
                quantity >= selectedVariant.stock ||
                selectedVariant.stock === 0
              }
            >
              +
            </button>
          </div>
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
          >
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

      <div className="product-description">
        <h3>Description</h3>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
