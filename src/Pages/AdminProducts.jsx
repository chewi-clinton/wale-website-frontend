import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../style/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    priceRange: "all",
    sortBy: "default",
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

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

  const applyFilters = () => {
    let result = [...products];

    // Apply category filter
    if (filters.category) {
      result = result.filter(
        (product) => product.category === parseInt(filters.category)
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          (product.description &&
            product.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply price range filter
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((product) => {
        if (!product.variants || product.variants.length === 0) return false;
        const prices = product.variants.map((v) => parseFloat(v.price));
        const minPrice = Math.min(...prices);
        return minPrice >= min && minPrice <= max;
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low-high":
        result.sort((a, b) => {
          const aPrice =
            a.variants && a.variants.length > 0
              ? Math.min(...a.variants.map((v) => parseFloat(v.price)))
              : 0;
          const bPrice =
            b.variants && b.variants.length > 0
              ? Math.min(...b.variants.map((v) => parseFloat(v.price)))
              : 0;
          return aPrice - bPrice;
        });
        break;
      case "price-high-low":
        result.sort((a, b) => {
          const aPrice =
            a.variants && a.variants.length > 0
              ? Math.min(...a.variants.map((v) => parseFloat(v.price)))
              : 0;
          const bPrice =
            b.variants && b.variants.length > 0
              ? Math.min(...b.variants.map((v) => parseFloat(v.price)))
              : 0;
          return bPrice - aPrice;
        });
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
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

  const startEditing = async (product) => {
    setEditingProduct(product.id);
    setEditForm({
      name: product.name,
      description: product.description,
      category: product.category,
      image: null,
    });

    try {
      const response = await api.get(`/api/products/${product.id}/variants/`);
      setVariants(response.data);
    } catch (err) {
      console.error("Failed to fetch variants", err);
      setVariants([]);
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm({ ...editForm, [name]: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
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

  const removeVariant = async (index) => {
    if (variants.length > 1) {
      const variantId = variants[index].id;

      if (variantId) {
        try {
          await api.delete(`/api/variants/${variantId}/`);
        } catch (err) {
          console.error("Failed to delete variant", err);
        }
      }

      const newVariants = [...variants];
      newVariants.splice(index, 1);
      setVariants(newVariants);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const validVariants = variants.filter((v) => v.name && v.price && v.stock);
    if (validVariants.length === 0) {
      setError("Please add at least one product variant");
      return;
    }

    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("description", editForm.description);
    formData.append("category", parseInt(editForm.category));

    if (editForm.image && editForm.image instanceof File) {
      formData.append("image", editForm.image);
    }

    setIsLoading(true);
    try {
      const productResponse = await api.patch(
        `/api/products/${editingProduct}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      for (const variant of validVariants) {
        if (variant.id) {
          await api.patch(`/api/variants/${variant.id}/`, {
            name: variant.name,
            price: parseFloat(variant.price),
            stock: parseInt(variant.stock),
          });
        } else {
          await api.post(`/api/products/${editingProduct}/variants/`, {
            name: variant.name,
            price: parseFloat(variant.price),
            stock: parseInt(variant.stock),
          });
        }
      }

      fetchProducts();
      setEditingProduct(null);
      setEditForm({});
      setVariants([]);
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
    setVariants([]);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      search: "",
      priceRange: "all",
      sortBy: "default",
    });
    setIsFilterMenuOpen(false);
  };

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h1>Product Management</h1>
        <button
          className="admin-back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="admin-mobile-filter-btn-container">
        <button className="admin-mobile-filter-btn" onClick={toggleFilterMenu}>
          <span className="admin-hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
          Filters
        </button>
      </div>

      <div
        className={`admin-filters-section ${isFilterMenuOpen ? "open" : ""}`}
      >
        <div className="admin-filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
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

        <div className="admin-filter-group">
          <label htmlFor="search-filter">Search:</label>
          <input
            type="text"
            id="search-filter"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search products..."
          />
        </div>

        <div className="admin-filter-group">
          <label htmlFor="price-filter">Price Range:</label>
          <select
            id="price-filter"
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
          >
            <option value="all">All Prices</option>
            <option value="0-25">Under $25</option>
            <option value="25-50">$25 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-1000">Over $100</option>
          </select>
        </div>

        <div className="admin-filter-group">
          <label htmlFor="sort-filter">Sort By:</label>
          <select
            id="sort-filter"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>

        <button className="admin-reset-filters-btn" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {error && <div className="admin-error-message">{error}</div>}

      <div className="admin-products-list">
        {isLoading && filteredProducts.length === 0 ? (
          <div className="admin-loading">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="admin-no-products">No products found</div>
        ) : (
          currentItems.map((product) => (
            <div key={product.id} className="admin-product-row">
              {editingProduct === product.id ? (
                <form
                  onSubmit={handleUpdateProduct}
                  className="admin-edit-form"
                >
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        required
                      />
                    </div>

                    <div className="admin-form-group">
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

                  <div className="admin-form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="admin-form-group">
                    <label>Product Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleEditChange}
                      accept="image/*"
                    />
                    <p className="admin-image-hint">
                      Leave empty to keep current image
                    </p>
                  </div>

                  <div className="admin-variants-section">
                    <div className="admin-variants-header">
                      <h3>Product Variants</h3>
                      {variants.length < 5 && (
                        <button
                          type="button"
                          onClick={addVariant}
                          className="admin-add-variant-btn"
                        >
                          + Add Variant
                        </button>
                      )}
                    </div>

                    <div className="admin-variants-list">
                      {variants.map((variant, index) => (
                        <div key={index} className="admin-variant-item">
                          {variants.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVariant(index)}
                              className="admin-remove-variant-btn"
                              aria-label="Remove variant"
                            >
                              ×
                            </button>
                          )}
                          <div className="admin-variant-content">
                            <div className="admin-variant-field">
                              <label>Variant Name</label>
                              <input
                                type="text"
                                value={variant.name}
                                onChange={(e) =>
                                  handleVariantChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., 30ml"
                                required
                              />
                            </div>

                            <div className="admin-variant-field">
                              <label>Price ($)</label>
                              <input
                                type="number"
                                value={variant.price}
                                onChange={(e) =>
                                  handleVariantChange(
                                    index,
                                    "price",
                                    e.target.value
                                  )
                                }
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                required
                              />
                            </div>

                            <div className="admin-variant-field">
                              <label>Stock</label>
                              <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) =>
                                  handleVariantChange(
                                    index,
                                    "stock",
                                    e.target.value
                                  )
                                }
                                min="0"
                                placeholder="0"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-edit-actions">
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
                  <div className="admin-product-row-content">
                    <div className="admin-product-image">
                      <img
                        src={product.image || "https://via.placeholder.com/200"}
                        alt={product.name}
                      />
                    </div>
                    <div className="admin-product-info">
                      <h3>{product.name}</h3>
                      <p className="admin-product-category">
                        {categories.find((c) => c.id === product.category)
                          ?.name || "Unknown"}
                      </p>
                      <div className="admin-product-variants">
                        {product.variants && product.variants.length > 0 ? (
                          product.variants.map((variant) => (
                            <div
                              key={variant.id}
                              className="admin-variant-info"
                            >
                              <span className="admin-variant-name">
                                {variant.name}
                              </span>
                              <span className="admin-variant-price">
                                ${parseFloat(variant.price).toFixed(2)}
                              </span>
                              <span className="admin-variant-stock">
                                Stock: {variant.stock}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="admin-no-variants">
                            No variants available
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="admin-product-actions">
                      <button onClick={() => startEditing(product)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="admin-pagination-container">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="admin-pagination-btn"
          >
            &laquo; Previous
          </button>

          <div className="admin-page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`admin-page-number ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="admin-pagination-btn"
          >
            Next &raquo;
          </button>
        </div>
      )}

      <button
        className="admin-fab"
        onClick={() => navigate("/admin/add-product")}
        title="Add Product"
      >
        +
      </button>
    </div>
  );
};

export default AdminProducts;
