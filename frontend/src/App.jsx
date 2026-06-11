import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuthStore, usePackageStore } from "./store/useStore";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import PackageDetail from "./pages/PackageDetail";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";
import BookingConfirmation from "./pages/BookingConfirmation";
import "./styles/global.css";

function App() {
  const { user, token } = useAuthStore();
  const { fetchPackages } = usePackageStore();

  useEffect(() => {
    fetchPackages();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    const { isAdmin } = useAuthStore();
    if (!isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-confirmation/:bookingId"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/:bookingId"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
