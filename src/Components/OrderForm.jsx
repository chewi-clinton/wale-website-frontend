import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice.js";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../constant/backend_url.jsx";

function OrderForm() {
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !shippingAddress) {
      setError("Please fill in all fields");
      return;
    }

    const orderData = {
      email,
      shipping_address: shippingAddress,
      total_price: totalPrice,
      items: cartItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/orders/`, orderData);
      dispatch(clearCart());
      navigate("/order-confirmation", {
        state: { orderId: response.data.unique_order_id },
      });
    } catch (err) {
      setError("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="order-form">
      <h2>Checkout</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default OrderForm;
