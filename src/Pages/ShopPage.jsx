import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/Shop.css";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    sortBy: "default",
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  // Parse URL query parameters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");

    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        category: categoryParam,
      }));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/products/");

        // Debug: Log the response to see what we're getting
        console.log("API Response:", response.data);
        console.log("Response type:", typeof response.data);
        console.log("Is array?", Array.isArray(response.data));

        // Check if response.data is an array or if products are nested
        let productsData;
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data && Array.isArray(response.data.results)) {
          // Handle paginated responses
          productsData = response.data.results;
        } else if (response.data && Array.isArray(response.data.products)) {
          // Handle wrapped responses
          productsData = response.data.products;
        } else if (response.data && typeof response.data === "object") {
          // If it's an object, try to find an array property
          const arrayKeys = Object.keys(response.data).filter((key) =>
            Array.isArray(response.data[key])
          );
          if (arrayKeys.length > 0) {
            productsData = response.data[arrayKeys[0]];
          } else {
            throw new Error("No array found in response data");
          }
        } else {
          throw new Error("Invalid response format");
        }

        // Ensure we have valid products data
        if (!Array.isArray(productsData)) {
          throw new Error("Products data is not an array");
        }

        setProducts(productsData);
        setFilteredProducts(productsData);

        // Extract unique categories safely
        const uniqueCategories = [
          ...new Set(
            productsData.map((item) => item.category_name).filter(Boolean)
          ),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });

        setError(
          `Failed to load products: ${err.message}. Please try again later.`
        );
        // Set empty arrays as fallback
        setProducts([]);
        setFilteredProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Only filter if we have products
    if (!Array.isArray(products) || products.length === 0) {
      return;
    }

    let result = [...products];

    if (filters.category !== "all") {
      result = result.filter((item) => item.category_name === filters.category);
    }

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((item) => {
        // Ensure item has variants array
        if (!Array.isArray(item.variants)) {
          return false;
        }
        const price = Math.min(
          ...item.variants.map((v) => parseFloat(v.price))
        );
        return price >= min && price <= max;
      });
    }

    switch (filters.sortBy) {
      case "price-low-high":
        result.sort((a, b) => {
          if (!Array.isArray(a.variants) || !Array.isArray(b.variants))
            return 0;
          const priceA = Math.min(
            ...a.variants.map((v) => parseFloat(v.price))
          );
          const priceB = Math.min(
            ...b.variants.map((v) => parseFloat(v.price))
          );
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        result.sort((a, b) => {
          if (!Array.isArray(a.variants) || !Array.isArray(b.variants))
            return 0;
          const priceA = Math.min(
            ...a.variants.map((v) => parseFloat(v.price))
          );
          const priceB = Math.min(
            ...b.variants.map((v) => parseFloat(v.price))
          );
          return priceB - priceA;
        });
        break;
      case "name-asc":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name-desc":
        result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const openVariantModal = (product) => {
    setSelectedProduct(product);
    const firstAvailableVariant =
      product.variants.find((v) => v.stock > 0) || product.variants[0];
    setSelectedVariant(firstAvailableVariant);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSelectedVariant(null);
    setQuantity(1);
  };

  const increaseQty = () => {
    if (selectedVariant && quantity < selectedVariant.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (selectedProduct && selectedVariant) {
      const productToAdd = {
        ...selectedProduct,
        selectedVariant,
      };
      addToCart(productToAdd, quantity);
      closeModal();
      alert(
        `${selectedProduct.name} (${selectedVariant.name}) x${quantity} added to cart!`
      );
    }
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      sortBy: "default",
    });
    setIsFilterMenuOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="shop-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <h2 className="shop-title">
        {filters.category !== "all"
          ? `${filters.category} Products`
          : "Our Products"}
      </h2>

      <div className="mobile-filter-btn-container">
        <button className="mobile-filter-btn" onClick={toggleFilterMenu}>
          <span className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
          Filters
        </button>
      </div>

      <div className={`filters-section ${isFilterMenuOpen ? "open" : ""}`}>
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
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

        <div className="filter-group">
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

        <button className="reset-filters-btn" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="products-grid">
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((item) => {
            // Ensure item has variants array before processing
            const variants = Array.isArray(item.variants) ? item.variants : [];
            const cheapestVariant =
              variants
                .filter((v) => v.stock > 0)
                .sort((a, b) => a.price - b.price)[0] || variants[0];

            return (
              <div key={item.id} className="product-card">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name || "Product"}
                  className="product-img"
                  onClick={() => handleProductClick(item.id)}
                />
                <h3 className="product-name">
                  {item.name || "Unknown Product"}
                </h3>
                <p className="product-category">
                  {item.category_name || "Unknown"}
                </p>
                <div className="product-price">
                  {cheapestVariant && (
                    <span className="new-price">
                      ${parseFloat(cheapestVariant.price).toFixed(2)}
                    </span>
                  )}
                  {variants.length > 1 && (
                    <span className="variant-count">
                      {variants.length} variants
                    </span>
                  )}
                </div>
                <button
                  className="add-to-cart"
                  onClick={() => openVariantModal(item)}
                  disabled={!cheapestVariant || cheapestVariant.stock === 0}
                >
                  {cheapestVariant && cheapestVariant.stock > 0
                    ? "Add to Cart"
                    : "Out of Stock"}
                </button>
              </div>
            );
          })}
      </div>

      {Array.isArray(filteredProducts) &&
        filteredProducts.length === 0 &&
        products.length > 0 && (
          <div className="no-products">
            <h3>No products match your filters</h3>
            <button className="reset-filters-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}

      {Array.isArray(products) &&
        products.length === 0 &&
        !loading &&
        !error && (
          <div className="no-products">
            <h3>No products available</h3>
          </div>
        )}

      {isModalOpen && selectedProduct && (
        <div className="variant-modal-overlay" onClick={closeModal}>
          <div className="variant-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close-modal" onClick={closeModal}>
                &times;
              </button>
              <h3>Select Variant</h3>
            </div>

            <div className="modal-content">
              <div className="modal-product-info">
                <img
                  src={
                    selectedProduct.image || "https://via.placeholder.com/150"
                  }
                  alt={selectedProduct.name}
                  className="modal-product-image"
                />
                <div className="modal-product-details">
                  <h4>{selectedProduct.name}</h4>
                  <p className="modal-product-category">
                    {selectedProduct.category_name || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="variant-selection">
                <h5>Select Variant:</h5>
                <div className="modal-variant-list">
                  {Array.isArray(selectedProduct.variants) &&
                    selectedProduct.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className={`modal-variant-item ${
                          selectedVariant && selectedVariant.id === variant.id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        <div className="variant-name">{variant.name}</div>
                        <div className="variant-price">
                          ${parseFloat(variant.price).toFixed(2)}
                        </div>
                        <div className="variant-stock">
                          {variant.stock > 0 ? (
                            <span className="in-stock">In Stock</span>
                          ) : (
                            <span className="out-of-stock">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {selectedVariant && (
                <div className="modal-quantity-section">
                  <h5>Quantity:</h5>
                  <div className="quantity-control">
                    <button onClick={decreaseQty} disabled={quantity <= 1}>
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={increaseQty}
                      disabled={quantity >= selectedVariant.stock}
                    >
                      +
                    </button>
                  </div>
                  <div className="stock-info">
                    {selectedVariant.stock > 0 ? (
                      <span className="in-stock">
                        {selectedVariant.stock} available
                      </span>
                    ) : (
                      <span className="out-of-stock">Out of Stock</span>
                    )}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <div className="modal-total-price">
                  Total: $
                  {selectedVariant
                    ? (selectedVariant.price * quantity).toFixed(2)
                    : "0.00"}
                </div>
                <button
                  className="modal-add-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || selectedVariant.stock === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
