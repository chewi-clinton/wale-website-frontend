import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../style/AdminOrderDetails.css";

const AdminOrderDetails = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError("");
    try {
      const response = await api.get(`/api/orders/${orderId}/`);
      setOrder(response.data);
    } catch (err) {
      setError("Order not found");
      setOrder(null);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-order-details">
      <div className="order-details-header">
        <h1>Order Details</h1>
        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="search-order-form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {order && (
        <div className="order-details-card">
          <h2>Order Information</h2>
          <div className="order-info">
            <p>
              <strong>Order ID:</strong> {order.unique_order_id}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Shipping Address:</strong> {order.shipping_address}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.payment_method}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> $
              {parseFloat(order.total_price).toFixed(2)}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          <h3>Order Items</h3>
          <div className="order-items">
            {order.items && order.items.length > 0 ? (
              <table className="order-items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product.name}</td>
                      <td>{item.quantity}</td>
                      <td>${parseFloat(item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No items found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetails;
