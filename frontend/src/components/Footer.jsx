import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#5A6C7D] text-white mt-12">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#A8D5E2]">
              MOMENTRY
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Budget travel adventures across India for backpackers and
              explorers.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-[#A8D5E2] hover:text-white transition text-lg p-2 touch-target"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-[#B4E7E1] hover:text-white transition text-lg p-2 touch-target"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-[#F5E6B3] hover:text-white transition text-lg p-2 touch-target"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <a
                  href="/"
                  className="hover:text-[#A8D5E2] transition block py-2 px-2 -mx-2"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  className="hover:text-[#A8D5E2] transition block py-2 px-2 -mx-2"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="hover:text-[#A8D5E2] transition block py-2 px-2 -mx-2"
                >
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="hover:text-[#A8D5E2] transition block py-2 px-2 -mx-2"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm sm:text-base text-gray-300">
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#A8D5E2] flex-shrink-0" />
                <a
                  href="tel:+91-XXXXXXXXXX"
                  className="hover:text-[#A8D5E2] transition break-all"
                >
                  +91-XXXXXXXXXX
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#B4E7E1] flex-shrink-0" />
                <a
                  href="mailto:contact@momentry.in"
                  className="hover:text-[#B4E7E1] transition break-all"
                >
                  contact@momentry.in
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#F5E6B3] mt-1 flex-shrink-0" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-3 text-sm">
              Get latest travel deals
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-3 rounded text-gray-800 text-base"
              />
              <button className="bg-[#A8D5E2] px-4 py-3 rounded hover:bg-blue-300 transition font-semibold text-base touch-target">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2024 MOMENTRY Travel. All rights reserved.</p>
            <div className="flex justify-center sm:justify-end gap-4 flex-wrap">
              <a href="#" className="hover:text-[#FF6B6B] transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#FF6B6B] transition">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-[#FF6B6B] transition">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
