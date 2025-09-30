import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "../constant/countries.js";
import { usStates } from "../constant/usaStates.js";
import { useCart } from "../context/CartContext";
import api from "../api";
import "../style/Checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    country: "United States",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "Alabama",
    zipCode: "",
    phone: "",
    email: "",
    saveInfo: false,
    paymentMethod: "zelle",
    discountCode: "",
    useShippingAsBilling: true,
  });

  const [orderTotals, setOrderTotals] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    discount: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const subtotal = parseFloat(getCartTotal().toFixed(2));
    const shipping = subtotal > 75 ? 0 : 9.99;
    const tax = parseFloat((subtotal * 0.08).toFixed(2));
    const discount = 0;
    const total = parseFloat((subtotal + shipping + tax - discount).toFixed(2));

    setOrderTotals({
      subtotal,
      shipping,
      tax,
      total,
      discount,
    });
  }, [cartItems, getCartTotal]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const shippingAddress = `${formData.address}${
        formData.apartment ? `, ${formData.apartment}` : ""
      }, ${formData.city}, ${formData.state} ${formData.zipCode}, ${
        formData.country
      }`;

      const orderItems = cartItems.map((item) => ({
        product: item.id,
        variant: item.selectedVariant.id,
        quantity: item.quantity,
        price: parseFloat(parseFloat(item.selectedVariant.price).toFixed(2)),
      }));

      const orderData = {
        email: formData.email,
        phone: formData.phone,
        shipping_address: shippingAddress,
        items: orderItems,
        total_price: parseFloat(parseFloat(orderTotals.total).toFixed(2)),
        payment_method: formData.paymentMethod,
      };

      // Use the default api instance (now only adds auth header if token exists)
      const response = await api.post("/api/orders/", orderData);
      clearCart();
      navigate("/order-confirmation", {
        state: {
          orderId: response.data.unique_order_id,
        },
      });
    } catch (err) {
      console.error("Order submission error:", err);
      if (err.response) {
        setError(
          `Failed to place order: ${
            err.response.data.detail || "Unknown error"
          }`
        );
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyDiscount = () => {
    if (formData.discountCode === "DISCOUNT10") {
      const discount = parseFloat((orderTotals.subtotal * 0.1).toFixed(2));
      const total = parseFloat(
        (
          orderTotals.subtotal +
          orderTotals.shipping +
          orderTotals.tax -
          discount
        ).toFixed(2)
      );
      setOrderTotals((prev) => ({
        ...prev,
        discount,
        total,
      }));
      alert("Discount applied: 10% off");
    } else {
      alert("Invalid discount code");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Please add items to your cart before checkout</p>
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
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="forms-section">
          <div className="section">
            <h2 className="section-title">Billing Details</h2>
            <div className="form-group">
              <select
                name="country"
                className="form-input"
                value={formData.country}
                onChange={handleInputChange}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <label className="form-label">Country/Region</label>
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  required
                />
              </div>
              <div className="form-group half">
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="company"
                className="form-input"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company (optional)"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                className="form-input"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="apartment"
                className="form-input"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
            <div className="form-row">
              <div className="form-group third">
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="form-group third">
                <select
                  name="state"
                  className="form-input"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={formData.country !== "United States"}
                >
                  {usStates.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <label className="form-label">
                  {formData.country === "United States"
                    ? "State"
                    : "State/Province"}
                </label>
              </div>
              <div className="form-group third">
                <input
                  type="text"
                  name="zipCode"
                  className="form-input"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder={
                    formData.country === "United States"
                      ? "ZIP code"
                      : "Postal code"
                  }
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleInputChange}
              />
              <label htmlFor="saveInfo">
                Save this information for next time
              </label>
            </div>
          </div>
          <div className="section">
            <h2 className="section-title">Shipping Method</h2>
            <p className="shipping-info">
              Priority, 2 Day, and Next Day orders will ship same day if
              received by 1pm EST on business days. Saturday and Sunday are not
              counted in delivery time for Next Day and 2 Day orders.
            </p>
          </div>
          <div className="section">
            <h2 className="section-title">Payment</h2>
            <p className="payment-security">
              All transactions are secure and encrypted.
            </p>
            <div className="payment-options">
              <div className="radio-group">
                <input
                  type="radio"
                  id="zelle"
                  name="paymentMethod"
                  value="zelle"
                  checked={formData.paymentMethod === "zelle"}
                  onChange={handleInputChange}
                />
                <label htmlFor="zelle" className="radio-label">
                  <span className="payment-name">Zelle</span>
                </label>
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  id="cashapp"
                  name="paymentMethod"
                  value="cashapp"
                  checked={formData.paymentMethod === "cashapp"}
                  onChange={handleInputChange}
                />
                <label htmlFor="cashapp" className="radio-label">
                  <span className="payment-name">CashApp</span>
                </label>
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  id="applepay"
                  name="paymentMethod"
                  value="applepay"
                  checked={formData.paymentMethod === "applepay"}
                  onChange={handleInputChange}
                />
                <label htmlFor="applepay" className="radio-label">
                  <span className="payment-name">Apple Pay</span>
                </label>
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  id="chime"
                  name="paymentMethod"
                  value="chime"
                  checked={formData.paymentMethod === "chime"}
                  onChange={handleInputChange}
                />
                <label htmlFor="chime" className="radio-label">
                  <span className="payment-name">Chime</span>
                </label>
              </div>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="useShippingAsBilling"
                name="useShippingAsBilling"
                checked={formData.useShippingAsBilling}
                onChange={handleInputChange}
              />
              <label htmlFor="useShippingAsBilling">
                Use shipping address as billing address
              </label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            className="checkout-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Checkout"}
          </button>
        </div>

        <div className="summary-section">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedVariant.id}`}
              className="order-item"
            >
              <div className="item-info">
                <div className="item-image">
                  <span className="quantity-badge">{item.quantity}</span>
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.name}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.selectedVariant.name}</p>
                  <p>{item.category_name || "Unknown"}</p>
                </div>
              </div>
              <div className="item-price">
                ${parseFloat(item.selectedVariant.price).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="discount-section">
            <div className="discount-input-group">
              <input
                type="text"
                placeholder="Discount code or gift card"
                className="discount-input"
                name="discountCode"
                value={formData.discountCode}
                onChange={handleInputChange}
              />
              <button className="apply-btn" onClick={applyDiscount}>
                Apply
              </button>
            </div>
          </div>
          <div className="totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${orderTotals.subtotal.toFixed(2)}</span>
            </div>
            {orderTotals.discount > 0 && (
              <div className="total-row discount">
                <span>Discount</span>
                <span>-${orderTotals.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="total-row">
              <span>Shipping</span>
              <span>
                {orderTotals.shipping === 0
                  ? "FREE"
                  : `$${orderTotals.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>${orderTotals.tax.toFixed(2)}</span>
            </div>
            <div className="total-row final">
              <span>Total</span>
              <span className="currency">
                USD ${orderTotals.total.toFixed(2)}
              </span>
            </div>
            {orderTotals.subtotal < 75 && orderTotals.shipping > 0 && (
              <p className="free-shipping-notice">
                Add ${(75 - orderTotals.subtotal).toFixed(2)} more for FREE
                shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
