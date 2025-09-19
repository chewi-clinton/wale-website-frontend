import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../style/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    search: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let url = "/api/products/";
      const params = [];
      if (filters.category) {
        params.push(`category=${filters.category}`);
      }
      if (filters.search) {
        params.push(`search=${filters.search}`);
      }
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }
      const response = await api.get(url);
      setProducts(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/categories/");
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setIsLoading(true);
    try {
      await api.delete(`/api/products/${id}/`);
      setProducts(products.filter((product) => product.id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      old_price: product.old_price ? product.old_price.toString() : "",
      stock: product.stock.toString(),
      category: product.category.toString(),
      image: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm({ ...editForm, [name]: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", editForm.name);
    formData.append("description", editForm.description);
    formData.append("price", parseFloat(editForm.price));
    if (editForm.old_price) {
      formData.append("old_price", parseFloat(editForm.old_price));
    }
    formData.append("stock", parseInt(editForm.stock));
    formData.append("category", parseInt(editForm.category));

    if (editForm.image && editForm.image instanceof File) {
      formData.append("image", editForm.image);
    }

    setIsLoading(true);
    try {
      const response = await api.patch(
        `/api/products/${editingProduct}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts(
        products.map((product) =>
          product.id === editingProduct ? response.data : product
        )
      );
      setEditingProduct(null);
      setEditForm({});
      setError("");
    } catch (err) {
      setError("Failed to update product");
      if (err.response) {
        console.error("Error response:", err.response.data);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  return (
    <div className="admin-products">
      <div className="products-header">
        <h1>Product Management</h1>
        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search products..."
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="products-grid">
        {isLoading && products.length === 0 ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              {editingProduct === product.id ? (
                <form onSubmit={handleUpdateProduct} className="edit-form">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Old Price ($)</label>
                      <input
                        type="number"
                        name="old_price"
                        value={editForm.old_price}
                        onChange={handleEditChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={editForm.stock}
                        onChange={handleEditChange}
                        min="0"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        required
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Product Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleEditChange}
                      accept="image/*"
                    />
                    <p className="image-hint">
                      Leave empty to keep current image
                    </p>
                  </div>

                  <div className="edit-actions">
                    <button type="submit" disabled={isLoading}>
                      Save
                    </button>
                    <button type="button" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="product-image">
                    <img
                      src={product.image || "https://via.placeholder.com/200"}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">
                      {categories.find((c) => c.id === product.category)
                        ?.name || "Unknown"}
                    </p>
                    <div className="product-price">
                      {product.old_price && (
                        <span className="old-price">
                          ${parseFloat(product.old_price).toFixed(2)}
                        </span>
                      )}
                      <span className="new-price">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </div>
                    <p className="product-stock">Stock: {product.stock}</p>
                  </div>
                  <div className="product-actions">
                    <button onClick={() => startEditing(product)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <button
        className="fab"
        onClick={() => navigate("/admin/add-product")}
        title="Add Product"
      >
        +
      </button>
    </div>
  );
};

export default AdminProducts;
