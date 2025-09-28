import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.css";
import logo from "../assets/Trimaxalogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <img src={logo} alt="Trimaxa Pharmacy Logo" />
            <h3>Trimaxa Pharmacy</h3>
          </div>
          <div className="footer-contact">
            <p>Committed to safe, effective, and affordable products.</p>
            <p>Backed by the latest health and wellness research.</p>
            <p>
              <span>Email: </span>
              <a href="mailto:dr@trimaxapharmacy.com">dr@trimaxapharmacy.com</a>
            </p>
            <p>
              <span>Phone: </span>
              <a href="tel:+14092099501">+1-409-209-9501</a>
            </p>
          </div>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>

            <li>
              <Link to="/buy-medication">Buy Medication Now</Link>
            </li>
            <li>
              <Link to="/apply-for-prescription">Apply For Prescription</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Useful Links</h4>
          <ul>
            <li>
              <Link to="/blog">blog</Link>
            </li>
            <li>
              <Link to="/refundandreturn">Refund Policy</Link>
            </li>
            <li>
              <Link to="/shippingpolicy">Shipping Policy</Link>
            </li>
            <li>
              <Link to="/privacypolicy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>
              <Link to="/shop">Medical Weight Loss</Link>
            </li>
            <li>
              <Link to="/shop">Diabetes Supplies</Link>
            </li>

            <li>
              <Link to="/shop">Insulin</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Trimaxa Pharmacy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
