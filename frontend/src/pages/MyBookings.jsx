import React, { useState, useEffect } from "react";
import { useBookingStore } from "../store/useStore";
import { FiCalendar, FiMapPin, FiUser, FiDollarSign } from "react-icons/fi";

export default function MyBookings() {
  const { bookings, fetchBookings } = useBookingStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchBookings();
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {bookings && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Package</p>
                    <p className="font-bold text-gray-800">
                      {booking.packageId?.title || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <FiMapPin /> Destination
                    </p>
                    <p className="font-bold text-gray-800">
                      {booking.packageId?.destination || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <FiUser /> Travelers
                    </p>
                    <p className="font-bold text-gray-800">
                      {booking.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <FiDollarSign /> Amount
                    </p>
                    <p className="font-bold text-[#A8D5E2]">
                      ₹{booking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">
              You haven't booked any packages yet
            </p>
            <a
              href="/packages"
              className="inline-block bg-[#A8D5E2] text-white px-6 py-3 rounded-lg hover:bg-blue-300 transition"
            >
              Explore Packages
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
