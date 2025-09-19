import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/Shop.css";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    sortBy: "default",
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products/");
        setProducts(response.data);
        setFilteredProducts(response.data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(
            response.data.map((item) => item.category_name).filter(Boolean)
          ),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply filters whenever products or filter settings change
    let result = [...products];

    // Category filter
    if (filters.category !== "all") {
      result = result.filter((item) => item.category_name === filters.category);
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((item) => {
        const price =
          typeof item.price === "number"
            ? item.price
            : parseFloat(item.price || 0);
        return price >= min && price <= max;
      });
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-low-high":
        result.sort((a, b) => {
          const priceA =
            typeof a.price === "number" ? a.price : parseFloat(a.price || 0);
          const priceB =
            typeof b.price === "number" ? b.price : parseFloat(b.price || 0);
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        result.sort((a, b) => {
          const priceA =
            typeof a.price === "number" ? a.price : parseFloat(a.price || 0);
          const priceB =
            typeof b.price === "number" ? b.price : parseFloat(b.price || 0);
          return priceB - priceA;
        });
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // No sorting
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

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
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

  return (
    <div className="shop-container">
      <h2 className="shop-title">Our Products</h2>

      {/* Mobile Filter Button */}
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

      {/* Filters Section */}
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
        {filteredProducts.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              className="product-img"
              onClick={() => handleProductClick(item.id)}
            />
            <h3 className="product-name">{item.name}</h3>
            <p className="product-category">
              {item.category_name || "Unknown"}
            </p>
            <div className="product-price">
              {item.old_price && (
                <span className="old-price">
                  ${parseFloat(item.old_price).toFixed(2)}
                </span>
              )}
              <span className="new-price">
                ${parseFloat(item.price).toFixed(2)}
              </span>
            </div>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && products.length > 0 && (
        <div className="no-products">
          <h3>No products match your filters</h3>
          <button className="reset-filters-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
