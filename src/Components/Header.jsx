import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/Header.css";
import logo from "../assets/Trimaxalogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShopMouseEnter = () => {
    setIsShopDropdownOpen(true);
  };

  const handleShopMouseLeave = () => {
    setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 500);
  };

  const handleDropdownMouseEnter = () => {
    setIsShopDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsShopDropdownOpen(false);
  };

  return (
    <>
      <div className="top-banner">
        <div className="marquee">
          FREE SHIPPING FOR OUR MEMBERS • 24/7 AVAILABLE • FAST SHIPPING
        </div>
      </div>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo">
              <img src={logo} alt="Trimaxa Logo" />
            </div>
            <h1 className="brand-name">TRIMAXA PHARMACY</h1>
          </div>

          <nav className="desktop-nav">
            <ul className="nav-list">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li
                className="nav-item-with-dropdown"
                onMouseEnter={handleShopMouseEnter}
                onMouseLeave={handleShopMouseLeave}
              >
                <Link to="/shop" className="shop-link">
                  SHOP
                  <svg
                    className="dropdown-arrow"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                {isShopDropdownOpen && (
                  <div
                    className="dropdown-menu"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <Link to="/shop?category=Medical Weight Loss">
                      Weight Loss
                    </Link>
                    <Link to="/shop?category=Insulin">Insulin</Link>
                    <Link to="/shop?category=Diabetes Supplies">
                      Diabetes Supply
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <Link to="/buy-medication">BUY MEDICATION NOW</Link>
              </li>
              <li>
                <Link to="/apply-for-prescription">APPLY FOR PRESCRIPTION</Link>
              </li>
              <li>
                <Link to="/about-us">ABOUT US</Link>
              </li>
              <li>
                <Link to="/blog">BLOG</Link>
              </li>
            </ul>
          </nav>

          <div className="header-right">
            <div className="header-icons">
              <Link to="/cart" className="icon-btn cart-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </Link>
            </div>

            <button
              className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <nav className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
          <ul className="mobile-nav-list">
            <li>
              <Link to="/" onClick={toggleMenu}>
                HOME
              </Link>
            </li>
            <li>
              <div className="mobile-nav-item-with-submenu">
                <Link to="/shop" onClick={toggleMenu}>
                  SHOP
                </Link>
                <button
                  className="mobile-submenu-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsShopDropdownOpen(!isShopDropdownOpen);
                  }}
                >
                  {isShopDropdownOpen ? "−" : "+"}
                </button>
              </div>
              {isShopDropdownOpen && (
                <ul className="mobile-submenu">
                  <li>
                    <Link to="/shop?category=Insulin" onClick={toggleMenu}>
                      Insulin
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop?category=Diabetes Supply"
                      onClick={toggleMenu}
                    >
                      Diabetes Supply
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop?category=Medical Weight Loss"
                      onClick={toggleMenu}
                    >
                      Weight Loss
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/buy-medication" onClick={toggleMenu}>
                BUY MEDICATION
              </Link>
            </li>
            <li>
              <Link to="/apply-for-prescription" onClick={toggleMenu}>
                APPLY FOR PRESCRIPTION
              </Link>
            </li>
            <li>
              <Link to="/about-us" onClick={toggleMenu}>
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={toggleMenu}>
                BLOG
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={toggleMenu}>
                FAQ
              </Link>
            </li>
          </ul>
          <div className="mobile-contact-info">
            <p>INFO@TRIMAXA.COM</p>
            <p>MON-FRI: 10:00 - 18:00</p>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
