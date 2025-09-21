import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../style/AdminAddProduct.css";

const AdminAddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    image: null,
  });
  const [variants, setVariants] = useState([
    { name: "", price: "", stock: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/categories/");
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
      setError("Failed to load categories. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, [name]: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    if (variants.length < 5) {
      setVariants([...variants, { name: "", price: "", stock: "" }]);
    }
  };

  const removeVariant = (index) => {
    if (variants.length > 1) {
      const newVariants = [...variants];
      newVariants.splice(index, 1);
      setVariants(newVariants);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      category: "",
      image: null,
    });
    setVariants([{ name: "", price: "", stock: "" }]);
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    // Validate required fields
    if (!newProduct.name.trim()) {
      setError("Product name is required");
      setIsSubmitting(false);
      return;
    }

    if (!newProduct.category) {
      setError("Category is required");
      setIsSubmitting(false);
      return;
    }

    if (!newProduct.description.trim()) {
      setError("Description is required");
      setIsSubmitting(false);
      return;
    }

    const validVariants = variants.filter((v) => v.name && v.price && v.stock);
    if (validVariants.length === 0) {
      setError("Please add at least one product variant");
      setIsSubmitting(false);
      return;
    }

    setIsLoading(true);

    try {
      // Create the product first
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("category", parseInt(newProduct.category));
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      const productResponse = await api.post("/api/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const productId = productResponse.data.id;

      // Create each variant
      for (const variant of validVariants) {
        const variantData = {
          name: variant.name,
          price: parseFloat(variant.price),
          stock: parseInt(variant.stock),
        };

        await api.post(`/api/products/${productId}/variants/`, variantData);
      }

      // Show success message
      setSuccess(true);
    } catch (err) {
      console.error("Error creating product:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        setError(
          `Failed to add product: ${
            err.response.data.detail || JSON.stringify(err.response.data)
          }`
        );
      } else {
        setError("Failed to add product. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-add-product">
      <div className="add-product-header">
        <h1>Add New Product</h1>
        <button
          className="back-btn"
          onClick={() => navigate("/admin/products")}
        >
          ← Back to Products
        </button>
      </div>

      {success ? (
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Product Added Successfully!</h2>
          <p>Your product has been added to the inventory.</p>
          <div className="success-actions">
            <button className="add-another-btn" onClick={resetForm}>
              Add Another Product
            </button>
            <button
              className="view-products-btn"
              onClick={() => navigate("/admin/products")}
            >
              View Products
            </button>
          </div>
        </div>
      ) : (
        <div className="add-product-form">
          <form onSubmit={handleSubmit} id="add-product-form">
            <div className="form-group">
              <label htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
                autoComplete="on"
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-category">Category</label>
              <select
                id="product-category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                required
                autoComplete="on"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="product-description">Description</label>
              <textarea
                id="product-description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                rows="4"
                required
                autoComplete="on"
                placeholder="Enter product description"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="product-image">Product Image</label>
              <input
                id="product-image"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                type="file"
                autoComplete="on"
              />
            </div>

            <div className="variants-section">
              <div className="variants-header">
                <h3>Product Variants</h3>
                {variants.length < 5 && (
                  <button
                    type="button"
                    onClick={addVariant}
                    className="add-variant-btn"
                    aria-label="Add variant"
                  >
                    + Add Variant
                  </button>
                )}
              </div>

              <div className="variants-list">
                {variants.map((variant, index) => (
                  <div key={index} className="variant-item">
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="remove-variant-btn"
                        aria-label={`Remove variant ${index + 1}`}
                      >
                        ×
                      </button>
                    )}
                    <div className="variant-content">
                      <div className="variant-field">
                        <label htmlFor={`variant-name-${index}`}>
                          Variant Name
                        </label>
                        <input
                          id={`variant-name-${index}`}
                          type="text"
                          name={`variant-name-${index}`}
                          value={variant.name}
                          onChange={(e) =>
                            handleVariantChange(index, "name", e.target.value)
                          }
                          placeholder="e.g., 30ml"
                          required
                          autoComplete="on"
                        />
                      </div>

                      <div className="variant-field">
                        <label htmlFor={`variant-price-${index}`}>
                          Price ($)
                        </label>
                        <input
                          id={`variant-price-${index}`}
                          type="number"
                          name={`variant-price-${index}`}
                          value={variant.price}
                          onChange={(e) =>
                            handleVariantChange(index, "price", e.target.value)
                          }
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          required
                          autoComplete="on"
                        />
                      </div>

                      <div className="variant-field">
                        <label htmlFor={`variant-stock-${index}`}>Stock</label>
                        <input
                          id={`variant-stock-${index}`}
                          type="number"
                          name={`variant-stock-${index}`}
                          value={variant.stock}
                          onChange={(e) =>
                            handleVariantChange(index, "stock", e.target.value)
                          }
                          min="0"
                          placeholder="0"
                          required
                          autoComplete="on"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              aria-label="Add product"
              className="submit-btn"
            >
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminAddProduct;
