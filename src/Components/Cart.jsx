import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  } = useCart();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="cart-count">
          {getCartCount()} item{getCartCount() !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-items">
            {cartItems.map((item) => {
              // Ensure price is a number
              const price =
                typeof item.price === "number"
                  ? item.price
                  : parseFloat(item.price) || 0;

              return (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                    />
                    {item.prescription && (
                      <span className="prescription-badge">Rx</span>
                    )}
                  </div>

                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-category">
                      {item.category?.name || "Unknown"}
                    </p>
                    <p className="item-status">
                      {item.stock > 0 ? "In Stock" : "Out of Stock"}
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
                      ${(price * item.quantity).toFixed(2)}
                    </span>
                    <span className="unit-price">${price.toFixed(2)} each</span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              );
            })}
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
