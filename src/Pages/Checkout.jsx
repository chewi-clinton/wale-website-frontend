import React, { useState } from "react";
import { countries } from "../constant/countries.js";
import { usStates } from "../constant/usaStates.js";
import "../style/Checkout.css";

const CheckoutPage = () => {
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
    saveInfo: false,
    paymentMethod: "zelle",
    discountCode: "",
    useShippingAsBilling: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout data:", formData);
  };

  const applyDiscount = () => {
    console.log("Applying discount code:", formData.discountCode);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        {/* Left Column - Forms */}
        <div className="forms-section">
          {/* Delivery Section */}
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
          {/* Payment Section */}
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
          <button className="checkout-btn" onClick={handleSubmit}>
            Checkout
          </button>
        </div>
        <div className="summary-section">
          <div className="order-item">
            <div className="item-info">
              <div className="item-image">
                <span className="quantity-badge">1</span>
                📦
              </div>
              <div className="item-details">
                <h3>EasyTouch Insulin Syringe 30 Gauge 1CC</h3>
                <p>1/2" - BX 100</p>
              </div>
            </div>
            <div className="item-price">$20.09</div>
          </div>
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
              <span>$20.09</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span className="shipping-calc">Enter shipping address</span>
            </div>
            <div className="total-row final">
              <span>Total</span>
              <span className="currency">USD $20.09</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
