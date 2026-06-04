import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useStore";
import { FiLogOut, FiShoppingBag, FiMenu } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Header() {
  const { user, isAdmin, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-[#A8D5E2] via-[#B4E7E1] to-[#4ECDC4] rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow">
              <FaMapMarkerAlt className="text-lg sm:text-xl" />
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-5 rounded-xl transition"></div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#A8D5E2] to-[#4ECDC4] bg-clip-text text-transparent">
                MOMENTRY
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Travel Adventures
              </span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#A8D5E2] transition"
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="text-gray-700 hover:text-[#A8D5E2] transition"
            >
              Packages
            </Link>
            {user && (
              <Link
                to="/bookings"
                className="text-gray-700 hover:text-[#A8D5E2] transition"
              >
                My Bookings
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-[#B4E7E1] transition"
              >
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-[#A8D5E2] text-white px-4 py-2 rounded-lg hover:bg-blue-300 transition"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#A8D5E2] transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#A8D5E2] text-white px-4 py-2 rounded-lg hover:bg-blue-300 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl p-2 -mr-2 touch-target"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <Link
              to="/"
              className="block py-3 px-2 text-gray-700 hover:text-[#A8D5E2] hover:bg-gray-50 rounded"
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="block py-3 px-2 text-gray-700 hover:text-[#A8D5E2] hover:bg-gray-50 rounded"
            >
              Packages
            </Link>
            {user && (
              <Link
                to="/bookings"
                className="block py-3 px-2 text-gray-700 hover:text-[#A8D5E2] hover:bg-gray-50 rounded"
              >
                My Bookings
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="block py-3 px-2 text-gray-700 hover:text-[#B4E7E1] hover:bg-gray-50 rounded"
              >
                Admin Panel
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-[#A8D5E2] text-white px-4 py-3 rounded-lg hover:bg-blue-300 transition font-semibold touch-target"
              >
                <FiLogOut /> Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-3 px-2 text-gray-700 hover:text-[#A8D5E2] hover:bg-gray-50 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="w-full mt-4 block text-center bg-[#A8D5E2] text-white px-4 py-3 rounded-lg hover:bg-blue-300 transition font-semibold touch-target"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
