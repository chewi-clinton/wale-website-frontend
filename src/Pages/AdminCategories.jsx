// src/Pages/AdminCategories.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Admin.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return navigate("/admin/login");

    try {
      const response = await axios.get(
        "http://localhost:8000/api/categories/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        // Attempt refresh or logout
        localStorage.removeItem("accessToken");
        navigate("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const data = { name, description };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/categories/${editingId}/`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/categories/", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCategories();
      setName("");
      setDescription("");
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setDescription(category.description);
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage Categories</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="admin-button">
          {editingId ? "Update" : "Add"} Category
        </button>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td className="admin-item-actions">
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(cat.id)}>
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

export default AdminCategories;
