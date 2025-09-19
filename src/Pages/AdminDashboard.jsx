import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <div className="card-icon">📦</div>
          <h2>Products</h2>
          <p>Manage your product catalog</p>
          <Link to="/admin/products" className="card-link">
            Manage Products
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📂</div>
          <h2>Categories</h2>
          <p>Organize products into categories</p>
          <Link to="/admin/categories" className="card-link">
            Manage Categories
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">➕</div>
          <h2>Add Product</h2>
          <p>Add a new product to your catalog</p>
          <Link to="/admin/add-product" className="card-link">
            Add Product
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <h2>Orders</h2>
          <p>View order details by order ID</p>
          <Link to="/admin/order-details" className="card-link">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
