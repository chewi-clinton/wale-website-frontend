// Updated src/App.js (replace the existing one)
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import ShopPage from "./Pages/ShopPage.jsx";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage.jsx";
import "./App.css";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import RefundAndReturnsPolicy from "./Pages/RefundandReturnPolicy.jsx";
import ShippingPolicy from "./Pages/ShippingPolicy.jsx";
import CheckoutPage from "./Pages/Checkout.jsx";
import AboutPage from "./Pages/About.jsx";
import Cart from "./Components/Cart.jsx";
import Home from "./Pages/Home.jsx";
import ProductDetail from "./Pages/ProductDetails.jsx";
import AgeVerification from "./Pages/AgeVerification.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";
import AdminCategories from "./Pages/AdminCategories.jsx";
import AdminProducts from "./Pages/AdminProducts.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Protect all routes unless user has verified age
const ProtectedRoute = ({ children }) => {
  const ageVerified = localStorage.getItem("ageVerified");
  return ageVerified ? children : <Navigate to="/age-check" />;
};

// Protect admin routes with JWT
const AdminProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <ScrollToTop />
        <main>
          <Routes>
            {/* Age verification page */}
            <Route path="/age-check" element={<AgeVerification />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <ShopPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product-details"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/privacypolicy"
              element={
                <ProtectedRoute>
                  <PrivacyPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-us"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shippingpolicy"
              element={
                <ProtectedRoute>
                  <ShippingPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/refundandreturn"
              element={
                <ProtectedRoute>
                  <RefundAndReturnsPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <ProtectedRoute>
                  <OrderConfirmationPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/categories"
              element={
                <AdminProtectedRoute>
                  <AdminCategories />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminProtectedRoute>
                  <AdminProducts />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
