import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
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
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AdminCategories from "./Pages/AdminCategories.jsx";
import AdminProducts from "./Pages/AdminProducts.jsx";
import AdminOrderDetails from "./Pages/AdminOrderDetails.jsx";
import AdminAddProduct from "./Pages/AdminAddProduct.jsx";
import InsulinForm from "./Pages/InsulinForm.jsx";
import Medicalweightloss from "./Pages/Medicalweightloss.jsx";
import Treatments from "./Pages/Treatments.jsx";
import ApplyForPrescription from "./Pages/Applyforprescription.jsx";
import Blog from "./Pages/Blog.jsx";
import BlogPost from "./Pages/BlogPost.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const ProtectedRoute = ({ children }) => {
  const ageVerified = localStorage.getItem("ageVerified");
  return ageVerified ? children : <Navigate to="/age-check" />;
};

const AdminProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Header />
            <ScrollToTop />
            <main>
              <Routes>
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
                  path="/product/:id"
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
                  path="/insulin-form"
                  element={
                    <ProtectedRoute>
                      <InsulinForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/buy-medication"
                  element={
                    <ProtectedRoute>
                      <Treatments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/apply-for-prescription"
                  element={
                    <ProtectedRoute>
                      <ApplyForPrescription />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/weight-loss-form"
                  element={
                    <ProtectedRoute>
                      <Medicalweightloss />
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
                <Route
                  path="/blog"
                  element={
                    <ProtectedRoute>
                      <Blog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/:id"
                  element={
                    <ProtectedRoute>
                      <BlogPost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <ProtectedRoute>
                      <div className="faq-page">
                        <div className="container">
                          <h1>Frequently Asked Questions</h1>
                          <p>FAQ content coming soon...</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
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
                <Route
                  path="/admin/add-product"
                  element={
                    <AdminProtectedRoute>
                      <AdminAddProduct />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/order-details"
                  element={
                    <AdminProtectedRoute>
                      <AdminOrderDetails />
                    </AdminProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
