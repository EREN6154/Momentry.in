import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useBookingStore,
  useAuthStore,
  usePackageStore,
} from "../store/useStore";
import { initializeRazorpay, razorpayConfig } from "../utils/api";
import { FiCreditCard, FiLock } from "react-icons/fi";
import axios from "axios";

export default function Payment() {
  const { bookingId } = useParams();
  const { bookings, fetchBookings } = useBookingStore();
  const { user } = useAuthStore();
  const { packages } = usePackageStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const booking = bookings?.find((b) => b._id === bookingId);
  const pkg = booking
    ? packages?.find((p) => p._id === booking.packageId)
    : null;

  if (!booking || !pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Booking not found</p>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await initializeRazorpay();
      if (!res) {
        setError("Failed to load Razorpay");
        setLoading(false);
        return;
      }

      // Create order on backend
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/payments/create-order`,
        { bookingId, amount: booking.totalPrice },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { orderId } = response.data;

      const options = {
        key: razorpayConfig.keyId,
        amount: booking.totalPrice * 100, // Razorpay expects amount in paise
        currency: razorpayConfig.currency,
        name: "MOMENTRY",
        description: `${pkg.title} - ${booking.quantity} traveler(s)`,
        order_id: orderId,
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post(
              `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/payments/verify`,
              {
                bookingId,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } },
            );

            if (verifyResponse.data.success) {
              navigate("/bookings");
            } else {
              setError("Payment verification failed");
            }
          } catch (err) {
            setError(
              err.response?.data?.message || "Payment verification failed",
            );
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#FF6B6B",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process payment");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Package</span>
                <span className="text-gray-800 font-bold">{pkg.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Destination</span>
                <span className="text-gray-800">{pkg.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="text-gray-800">{pkg.duration} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per Person</span>
                <span className="text-gray-800">
                  ₹{pkg.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Travelers</span>
                <span className="text-gray-800">{booking.quantity}</span>
              </div>
            </div>

            <div className="py-6 border-b">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-[#FF6B6B]">
                  ₹{booking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-bold text-gray-800 mb-3">Traveler Details</h3>
              <p className="text-gray-600">Name: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Payment Method
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiCreditCard /> Secure Payment Gateway
              </h3>
              <p className="text-gray-600 mb-6">
                We use Razorpay, India's most trusted payment gateway, to
                process your payment securely.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-2 mb-2">
                  <FiLock className="text-blue-600" />
                  <span className="text-blue-900 text-sm">
                    <strong>100% Secure:</strong> Your payment information is
                    encrypted and protected.
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#FF6B6B] text-white font-bold py-3 rounded-lg hover:bg-red-600 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <FiCreditCard /> Pay ₹{booking.totalPrice.toLocaleString()}{" "}
                    with Razorpay
                  </>
                )}
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                By clicking "Pay", you agree to our terms and conditions. Your
                booking will be confirmed after successful payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
