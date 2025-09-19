import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "../style/AdminCategories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/categories/");
      setCategories(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch categories");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/categories/", {
        name: newCategory,
      });
      setCategories([...categories, response.data]);
      setNewCategory("");
      setError("");
    } catch (err) {
      setError("Failed to add category");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setIsLoading(true);
    try {
      await axios.delete(`/api/categories/${id}/`);
      setCategories(categories.filter((cat) => cat.id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete category");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.put(`/api/categories/${editingCategory}/`, {
        name: editName,
      });
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory ? response.data : cat
        )
      );
      setEditingCategory(null);
      setEditName("");
      setError("");
    } catch (err) {
      setError("Failed to update category");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditName("");
  };

  return (
    <div className="admin-categories">
      <div className="categories-header">
        <h1>Category Management</h1>
        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="add-category-form">
        <h2>Add New Category</h2>
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="categories-grid">
        {isLoading && categories.length === 0 ? (
          <div className="loading">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="no-categories">No categories found</div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="category-card">
              {editingCategory === category.id ? (
                <form onSubmit={handleUpdateCategory} className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
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
                  <h3>{category.name}</h3>
                  <div className="category-actions">
                    <button onClick={() => startEditing(category)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
