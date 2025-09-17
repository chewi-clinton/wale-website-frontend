import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Cart.css";
import aboutImage3 from "../assets/image5.png";
import aboutImage4 from "../assets/image4.png";
import diabetesimg from "../assets/image3.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const mockCartItems = [
    {
      id: 1,
      name: "Advanced Weight Management Formula",
      price: 49.99,
      quantity: 2,
      image: aboutImage3,
      category: "Weight Loss",
      inStock: true,
      prescription: false,
    },
    {
      id: 2,
      name: "Premium Insulin Solution",
      price: 89.99,
      quantity: 1,
      image: aboutImage4,
      category: "Diabetes Care",
      inStock: true,
      prescription: true,
    },
    {
      id: 3,
      name: "Complete Wellness Multivitamin",
      price: 29.99,
      quantity: 3,
      image: diabetesimg,
      category: "Overall Wellness",
      inStock: true,
      prescription: false,
    },
  ];

  useEffect(() => {
    setCartItems(mockCartItems);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <button className="continue-shopping-btn">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="cart-count">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                  {item.prescription && (
                    <span className="prescription-badge">Rx</span>
                  )}
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-status">
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="item-price">
                  <span className="price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <span className="unit-price">${item.price} each</span>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-section">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>
                {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="summary-line">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {subtotal < 75 && (
              <p className="free-shipping-notice">
                Add ${(75 - subtotal).toFixed(2)} more for FREE shipping
              </p>
            )}
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout - ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
