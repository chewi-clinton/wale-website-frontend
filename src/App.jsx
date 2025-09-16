import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShopPage from "./Pages/ShopPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage.jsx";
import "./App.css";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import RefundAndReturnsPolicy from "./Pages/RefundandReturnPolicy.jsx";
import ShippingPolicy from "./Pages/ShippingPolicy.jsx";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/shippingpolicy" element={<ShippingPolicy />} />
            <Route
              path="/refundandreturn"
              element={<RefundAndReturnsPolicy />}
            />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
