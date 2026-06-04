import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiClock, FiUsers, FiArrowRight } from "react-icons/fi";

export default function PackageCard({ pkg }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group h-full">
      {/* Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-200">
        <img
          src={
            pkg.image ||
            "https://via.placeholder.com/400x300?text=" + pkg.destination
          }
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute top-3 right-3 bg-[#A8D5E2] text-white px-3 py-1 rounded-full text-sm font-bold">
          ₹{pkg.price.toLocaleString()}
        </div>
        {!pkg.isActive && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold">Deactivated</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {pkg.title}
        </h3>

        {/* Details */}
        <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-[#A8D5E2]" />
            <span>{pkg.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="text-[#B4E7E1]" />
            <span>{pkg.duration} days</span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers className="text-[#F5E6B3]" />
            <span>{pkg.maxParticipants} max participants</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pkg.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.highlights?.slice(0, 2).map((highlight, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Button */}
        {pkg.isActive ? (
          <Link
            to={`/packages/${pkg._id}`}
            className="inline-flex items-center justify-center gap-2 bg-[#A8D5E2] text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-blue-300 transition w-full font-semibold text-sm sm:text-base touch-target"
          >
            View Details <FiArrowRight />
          </Link>
        ) : (
          <button className="w-full bg-gray-300 text-gray-600 px-4 py-3 rounded-lg cursor-not-allowed font-semibold">
            Not Available
          </button>
        )}
      </div>
    </div>
  );
}
