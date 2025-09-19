import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/Header.css";
import logo from "../assets/Trimaxalogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              <li>
                <Link to="/shop">SHOP</Link>
              </li>
              <li>
                <Link to="/about-us">ABOUT US</Link>
              </li>
              <li>
                <Link to="/promo">PROMO</Link>
              </li>
            </ul>
          </nav>

          <div className="header-right">
            <div className="header-icons">
              <button className="icon-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button className="icon-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <button className="icon-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
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
              <Link to="/shop" onClick={toggleMenu}>
                SHOP
              </Link>
            </li>
            <li>
              <Link to="/about-us" onClick={toggleMenu}>
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu}>
                CONTACT
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={toggleMenu}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/promo" onClick={toggleMenu}>
                PROMO
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
