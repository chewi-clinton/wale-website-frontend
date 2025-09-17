import React, { useState } from "react";
import "../style/ProductDetails.css";
import logo from "../assets/review3.jpg";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div className="product-detail-container">
      {/* Left Side: Image */}
      <div className="product-image">
        <img src={logo} alt="Morphine" />
      </div>

      {/* Right Side: Product Info */}
      <div className="product-info">
        <h2 className="product-title">Morphine</h2>
        <p className="product-price">$100.00</p>
        <p className="product-short-desc">
          <strong>Morphine</strong> is a potent prescription opioid used to
          treat severe pain from surgery, injury, or chronic conditions like
          cancer. It works by blocking pain signals in the brain, offering
          powerful relief. Always use as directed by your doctor for safe and
          effective pain management.
        </p>

        <div className="quantity-cart">
          <div className="quantity-control">
            <button onClick={decreaseQty}>−</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>
          <button className="add-to-cart">ADD TO CART</button>
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
          <strong>Category:</strong> Pain Killers
        </p>
      </div>

      {/* Bottom: Description Section */}
      <div className="product-description">
        <h3>Description</h3>
        <h4>Morphine for pain relief</h4>
        <p>
          <strong>Morphine</strong> is a potent prescription opioid medication
          widely used to manage severe pain, such as pain from surgery,
          traumatic injuries, or chronic conditions like cancer. It belongs to a
          class of drugs called opioids, which work by binding to specific
          receptors in the brain and spinal cord to block pain signals. Morphine
          is available in various forms, including tablets, injections, liquid
          solutions, and extended-release formulations, making it a versatile
          option for pain relief.
        </p>

        <h4>Advantages of Morphine pain killer:</h4>
        <ul>
          <li>
            <strong>Effective Pain Relief:</strong> Provides powerful relief for
            severe and chronic pain, improving quality of life for patients.
          </li>
          <li>
            <strong>Versatile Administration:</strong> Available in multiple
            forms (oral, injectable, extended-release) to suit individual needs
            and conditions.
          </li>
          <li>
            <strong>Rapid Action:</strong> Injectable forms work quickly, making
            it ideal for acute pain situations.
          </li>
          <li>
            <strong>Palliative Care:</strong> Commonly used in hospice and
            cancer care to alleviate severe pain.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
