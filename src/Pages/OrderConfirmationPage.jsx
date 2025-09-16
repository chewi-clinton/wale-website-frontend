import React from "react";
import { useLocation } from "react-router-dom";

function OrderConfirmationPage() {
  const { state } = useLocation();
  const orderId = state?.orderId || "Unknown";

  return (
    <div className="order-confirmation">
      <h2>Order Confirmed</h2>
      <p>Your order (ID: {orderId}) has been placed successfully.</p>
      <p>You will receive a confirmation email soon.</p>
    </div>
  );
}

export default OrderConfirmationPage;
