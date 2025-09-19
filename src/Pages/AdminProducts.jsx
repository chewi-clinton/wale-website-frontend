import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "../style/Admin.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return navigate("/admin/login");

    try {
      const response = await axios.get("/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/admin/login");
      }
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get("/api/categories/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("old_price", oldPrice || null);
    formData.append("stock", stock);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("/api/products/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchProducts();
      setName("");
      setDescription("");
      setPrice("");
      setOldPrice("");
      setStock("");
      setCategory("");
      setImage(null);
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setOldPrice(product.old_price || "");
    setStock(product.stock);
    setCategory(product.category.id);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`/api/products/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage Products</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Old Price (optional)"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="admin-button">
          {editingId ? "Update" : "Add"} Product
        </button>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.category.name}</td>
              <td>${prod.price}</td>
              <td>{prod.old_price ? `$${prod.old_price}` : "-"}</td>
              <td>{prod.stock}</td>
              <td className="admin-item-actions">
                <button onClick={() => handleEdit(prod)}>Edit</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(prod.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
