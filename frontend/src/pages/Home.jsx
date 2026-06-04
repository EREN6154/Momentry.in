import React from "react";
import { Link } from "react-router-dom";
import { FiTrendingUp, FiUsers, FiMapPin, FiAward } from "react-icons/fi";
import { usePackageStore } from "../store/useStore";
import PackageCard from "../components/PackageCard";

export default function Home() {
  const { packages } = usePackageStore();
  const featuredPackages = packages?.slice(0, 6) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A8D5E2] via-[#B4E7E1] to-[#F5E6B3] -z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop')] opacity-20 bg-cover bg-center -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent -z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-white bg-opacity-90 backdrop-blur mb-6 animate-fadeIn">
            <span className="text-[#A8D5E2] font-bold text-sm">🌍 EXPLORE INDIA'S BEST DESTINATIONS</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight text-gray-800 drop-shadow-lg">
            Your Next <span className="bg-gradient-to-r from-[#A8D5E2] to-[#4ECDC4] bg-clip-text text-transparent">Adventure</span> Awaits
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-700 px-2 font-light">
            Unforgettable experiences starting from ₹5,000 • Travel with MOMENTRY
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/packages"
              className="inline-block bg-gradient-to-r from-[#A8D5E2] to-[#4ECDC4] text-white px-8 sm:px-10 py-4 rounded-lg font-bold hover:shadow-2xl transition transform hover:scale-105 touch-target text-base sm:text-lg shadow-lg"
            >
              🎒 Explore Packages
            </Link>
            <button className="inline-block border-2 border-[#A8D5E2] text-[#A8D5E2] px-8 sm:px-10 py-4 rounded-lg font-bold hover:bg-[#A8D5E2] hover:text-white transition touch-target text-base sm:text-lg">
              📍 View Map
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="inline-block bg-[#A8D5E2] text-white p-4 rounded-full mb-3">
                <FiMapPin className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">50+</h3>
              <p className="text-gray-600">Destinations</p>
            </div>
            <div className="text-center">
              <div className="inline-block bg-[#B4E7E1] text-white p-4 rounded-full mb-3">
                <FiUsers className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">5000+</h3>
              <p className="text-gray-600">Happy Travelers</p>
            </div>
            <div className="text-center">
              <div className="inline-block bg-[#F5E6B3] text-white p-4 rounded-full mb-3">
                <FiAward className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">4.8/5</h3>
              <p className="text-gray-600">Rating</p>
            </div>
            <div className="text-center">
              <div className="inline-block bg-[#A8D5E2] text-white p-4 rounded-full mb-3">
                <FiTrendingUp className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">100%</h3>
              <p className="text-gray-600">Safe & Secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 border-t-4 border-[#D4A574]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-[#D4A574] bg-opacity-10 border border-[#D4A574] mb-4">
              <span className="text-[#D4A574] font-bold text-sm">
                ✨ PREMIUM COLLECTION
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
              Featured Packages
            </h2>
            <p className="text-gray-600">
              Handpicked adventures for budget travelers
            </p>
            <div className="h-1 w-24 bg-[#D4A574] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/packages"
              className="inline-block bg-[#A8D5E2] text-white px-8 py-3 rounded-lg font-bold hover:shadow-xl transition border-2 border-[#D4A574]"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-b-4 border-[#D4A574]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose MOMENTRY?
          </h2>
          <div className="h-1 w-24 bg-[#D4A574] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-[#D4A574] transform hover:scale-105">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Budget Friendly
              </h3>
              <p className="text-gray-600">
                Affordable packages designed for backpackers and budget
                travelers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-[#D4A574] transform hover:scale-105">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                Travel with confidence with our verified guides and secure
                payments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-[#D4A574] transform hover:scale-105">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Expert Guides
              </h3>
              <p className="text-gray-600">
                Local experts who know hidden gems and authentic experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#A8D5E2] to-[#B4E7E1] text-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg mb-6">
            Join thousands of travelers exploring India with MOMENTRY
          </p>
          <Link
            to="/packages"
            className="inline-block bg-white text-[#A8D5E2] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
