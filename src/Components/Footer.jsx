import React from "react";
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
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Medical Weight Loss</a>
            </li>
            <li>
              <a href="#">Diabetes Supplies</a>
            </li>
            <li>
              <a href="#">Pain Killers</a>
            </li>
            <li>
              <a href="#">Insulin</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Apply For Prescription</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Useful Links</h4>
          <ul>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">Cart</a>
            </li>
            <li>
              <a href="#">Refund Policy</a>
            </li>
            <li>
              <a href="#">Shipping Policy</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>
              <a href="#">Medical Weight Loss</a>
            </li>
            <li>
              <a href="#">Diabetes Supplies</a>
            </li>

            <li>
              <a href="#">Pain Killers</a>
            </li>
            <li>
              <a href="#">Insulin</a>
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
