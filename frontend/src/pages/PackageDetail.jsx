import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  usePackageStore,
  useAuthStore,
  useBookingStore,
} from "../store/useStore";
import { FiMapPin, FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";

export default function PackageDetail() {
  const { id } = useParams();
  const { packages } = usePackageStore();
  const { user } = useAuthStore();
  const { createBooking } = useBookingStore();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const pkg = packages?.find((p) => p._id === id);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Package not found</p>
      </div>
    );
  }

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    const result = await createBooking(id, quantity);
    if (result.success) {
      navigate(`/payment/${result.data._id}`);
    }
    setLoading(false);
  };

  const totalPrice = pkg.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="h-96 overflow-hidden bg-gray-200">
        <img
          src={
            pkg.image ||
            "https://via.placeholder.com/1200x400?text=" + pkg.destination
          }
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {pkg.title}
              </h1>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-6 border-y">
                <div className="flex items-center gap-4">
                  <FiMapPin className="text-2xl text-[#A8D5E2]" />
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="text-lg font-bold text-gray-800">
                      {pkg.destination}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FiClock className="text-2xl text-[#B4E7E1]" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-lg font-bold text-gray-800">
                      {pkg.duration} Days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FiUsers className="text-2xl text-[#F5E6B3]" />
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="text-lg font-bold text-gray-800">
                      {pkg.maxParticipants} People
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  About This Package
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {pkg.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {pkg.highlights?.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FiCheckCircle className="text-[#00B894] mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              {pkg.itinerary && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Itinerary
                  </h2>
                  <div className="space-y-4">
                    {pkg.itinerary.map((day, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-[#A8D5E2] pl-4 py-2"
                      >
                        <h3 className="font-bold text-gray-800">
                          Day {day.day}: {day.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {day.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-600">Price per Person</p>
                <h3 className="text-4xl font-bold text-[#A8D5E2]">
                  ₹{pkg.price.toLocaleString()}
                </h3>
              </div>

              <div className="mb-6 pb-6 border-b">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Number of Travelers
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 text-gray-700 w-10 h-10 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          1,
                          Math.min(
                            pkg.maxParticipants,
                            parseInt(e.target.value) || 1,
                          ),
                        ),
                      )
                    }
                    className="w-16 text-center border border-gray-300 rounded py-2"
                  />
                  <button
                    onClick={() =>
                      setQuantity(Math.min(pkg.maxParticipants, quantity + 1))
                    }
                    className="bg-gray-200 text-gray-700 w-10 h-10 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Base Price</span>
                  <span className="text-gray-800">
                    ₹{(pkg.price * quantity).toLocaleString()}
                  </span>
                </div>
                <div className="text-lg font-bold flex justify-between text-gray-800">
                  <span>Total</span>
                  <span className="text-[#A8D5E2]">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {pkg.isActive ? (
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full bg-[#A8D5E2] text-white font-bold py-3 rounded-lg hover:bg-blue-300 transition disabled:bg-gray-400"
                >
                  {loading ? "Processing..." : "Book Now"}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-600 font-bold py-3 rounded-lg cursor-not-allowed"
                >
                  Not Available
                </button>
              )}

              <p className="text-xs text-gray-600 text-center mt-4">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
