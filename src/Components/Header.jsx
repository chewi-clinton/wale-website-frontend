import React, { useState } from "react";
import "../style/Header.css";
// Import your logo
import logo from "../assets/Trimaxalogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Top banner with marquee effect */}
      <div className="top-banner">
        <div className="marquee">FREE SHIPPING FOR OUR MEMBERS</div>
      </div>

      {/* Main header */}
      <header className="main-header">
        <div className="header-container">
          {/* Logo section - shifted more to the left */}
          <div className="logo-section">
            <div className="logo">
              <img src={logo} alt="Timaxa Logo" />
            </div>
            <h1 className="brand-name">TRIMAXA PHARMACY</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              <li>
                <a href="#homes">HOME</a>
              </li>
              <li>
                <a href="#shop">SHOP</a>
              </li>
              <li>
                <a href="#about">ABOUT US</a>
              </li>
              <li>
                <a href="#promo">PROMO</a>
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
              <button className="icon-btn">
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
              </button>
            </div>

            {/* Mobile menu button */}
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

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
          <ul className="mobile-nav-list">
            <li>
              <a href="#homes" onClick={toggleMenu}>
                HOMES
              </a>
            </li>
            <li>
              <a href="#shop" onClick={toggleMenu}>
                SHOP
              </a>
            </li>
            <li>
              <a href="#about" onClick={toggleMenu}>
                ABOUT US
              </a>
            </li>
            <li>
              <a href="#contacts" onClick={toggleMenu}>
                CONTACTS
              </a>
            </li>
            <li>
              <a href="#faq" onClick={toggleMenu}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#promo" onClick={toggleMenu}>
                PROMO
              </a>
            </li>
          </ul>
          <div className="mobile-contact-info">
            <p>INFO@TIMAXA.COM</p>
            <p>MON-FRI: 10:00 - 18:00</p>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
