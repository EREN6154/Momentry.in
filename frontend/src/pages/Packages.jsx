import React, { useState, useEffect } from "react";
import { usePackageStore } from "../store/useStore";
import PackageCard from "../components/PackageCard";
import { FiSearch, FiSliders } from "react-icons/fi";

export default function Packages() {
  const { packages, filteredPackages, filterPackages } = usePackageStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [destination, setDestination] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const destinations = [...new Set(packages?.map((p) => p.destination) || [])];
  const durations = [...new Set(packages?.map((p) => p.duration) || [])];

  const handleFilter = () => {
    filterPackages({
      search: searchTerm,
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
      duration: duration ? parseInt(duration) : null,
      destination: destination || null,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setDuration("");
    setDestination("");
    filterPackages({});
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, minPrice, maxPrice, duration, destination]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">
            Travel Packages
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Discover amazing destinations across India
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by destination or package name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#4ECDC4] text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition"
            >
              <FiSliders /> Filters
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                >
                  <option value="">All</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="100000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Duration (days)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                >
                  <option value="">All</option>
                  {durations.map((dur) => (
                    <option key={dur} value={dur}>
                      {dur} days
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleReset}
                  className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-bold">{filteredPackages?.length || 0}</span>{" "}
            packages
          </p>
        </div>

        {/* Packages Grid */}
        {filteredPackages && filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-xl text-gray-600">
              No packages found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
