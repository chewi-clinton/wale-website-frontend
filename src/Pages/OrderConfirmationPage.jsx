import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

function OrderConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const orderId = state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate("/shop");
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        // Use the correct endpoint with unique_order_id
        const response = await api.get(`/api/orders/${orderId}/`);
        setOrderDetails(response.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Could not retrieve order details. Please contact support.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  if (isLoading) {
    return (
      <div className="order-confirmation">
        <h2>Loading order details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-confirmation">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/shop")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <h2>Order Confirmed</h2>
      <div className="order-details">
        <p>
          <strong>Order ID:</strong> {orderDetails.unique_order_id}
        </p>
        <p>
          <strong>Email:</strong> {orderDetails.email}
        </p>
        <p>
          <strong>Total:</strong> $
          {parseFloat(orderDetails.total_price).toFixed(2)}
        </p>
        <p>
          <strong>Shipping Address:</strong> {orderDetails.shipping_address}
        </p>
      </div>
      <p>
        You will receive a confirmation email soon with our payment details.
      </p>
      <button
        className="continue-shopping-btn"
        onClick={() => navigate("/shop")}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderConfirmationPage;
