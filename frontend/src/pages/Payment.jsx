import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useBookingStore,
  useAuthStore,
  usePackageStore,
} from "../store/useStore";
import { initializeRazorpay, razorpayConfig } from "../utils/api";
import { FiLock } from "react-icons/fi";
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
      <div className="min-h-screen flex items-center justify-center bg-alabaster">
        <p className="font-serif text-2xl text-espresso">Booking not found</p>
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
              navigate(`/booking-confirmation/${bookingId}`);
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
          color: "#D4AF37",
          backdrop_color: "rgba(0, 0, 0, 0.7)",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process payment");
    }

    setLoading(false);
  };

  const baseFare = booking.totalPrice * 0.85;
  const convenienceFee = booking.totalPrice * 0.05;
  const gst = booking.totalPrice * 0.1;

  return (
    <div className="min-h-screen bg-alabaster py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-espresso/10 rounded-sm p-8">
              <p className="text-champagne text-xs font-bold tracking-[0.2em] mb-2">
                ORDER SUMMARY
              </p>
              <h2 className="font-serif text-2xl text-espresso mb-8">
                {pkg.title}
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-espresso/10">
                  <div>
                    <p className="text-xs text-espresso/50 uppercase tracking-widest">
                      Destination
                    </p>
                    <p className="text-espresso font-semibold">
                      {pkg.destination}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-espresso/50 uppercase tracking-widest">
                      Duration
                    </p>
                    <p className="text-espresso font-semibold">
                      {pkg.duration} Days
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-espresso/50 uppercase tracking-widest mb-3">
                    Travelers
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-espresso/70 font-light">
                      {booking.quantity} Person{booking.quantity > 1 ? "s" : ""}
                    </span>
                    <span className="text-espresso font-semibold">
                      ₹{(pkg.price * booking.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-espresso/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/60 font-light">Base Fare</span>
                  <span className="text-espresso">
                    ₹{Math.floor(baseFare).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/60 font-light">
                    Convenience Fee
                  </span>
                  <span className="text-espresso">
                    ₹{Math.floor(convenienceFee).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/60 font-light">GST (18%)</span>
                  <span className="text-espresso">
                    ₹{Math.floor(gst).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-espresso/20">
                  <span className="font-semibold text-espresso text-sm tracking-wide">
                    TOTAL PAYABLE
                  </span>
                  <span className="font-serif text-3xl font-bold text-espresso">
                    ₹{booking.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-espresso/10">
                <p className="text-xs text-espresso/50 uppercase tracking-widest mb-2">
                  Guest
                </p>
                <p className="text-espresso font-medium">{user.name}</p>
                <p className="text-sm text-espresso/60 font-light">
                  {user.email}
                </p>
              </div>

              {/* Razorpay trust badge */}
              <div className="mt-8 pt-6 border-t border-espresso/10 flex items-center gap-3">
                <span className="bg-espresso text-white text-xs font-bold px-3 py-1 rounded-sm tracking-wider">
                  RAZORPAY
                </span>
                <span className="text-xs text-espresso/60 font-light">
                  Trusted & PCI-DSS secure checkout
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-espresso/10 rounded-sm p-8">
              <p className="text-champagne text-xs font-bold tracking-[0.2em] mb-2">
                PAYMENT METHOD
              </p>
              <h2 className="font-serif text-3xl text-espresso mb-8">
                Complete your booking
              </h2>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="border-2 border-champagne bg-champagne/5 rounded-sm p-6 cursor-pointer transition">
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="mt-1.5 w-5 h-5 accent-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-espresso mb-1">UPI</p>
                      <p className="text-sm text-espresso/60 font-light">
                        Google Pay · PhonePe · BHIM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-espresso/20 rounded-sm p-6 cursor-pointer hover:border-champagne transition">
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="payment"
                      className="mt-1.5 w-5 h-5 accent-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-espresso mb-1">
                        Credit / Debit Card
                      </p>
                      <p className="text-sm text-espresso/60 font-light">
                        Visa · Mastercard · Amex · RuPay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-espresso/20 rounded-sm p-6 cursor-pointer hover:border-champagne transition">
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="payment"
                      className="mt-1.5 w-5 h-5 accent-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-espresso mb-1">
                        NetBanking
                      </p>
                      <p className="text-sm text-espresso/60 font-light">
                        All major Indian banks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-espresso/20 rounded-sm p-6 cursor-pointer hover:border-champagne transition">
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="payment"
                      className="mt-1.5 w-5 h-5 accent-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-espresso mb-1">EMI</p>
                      <p className="text-sm text-espresso/60 font-light">
                        Easy installments available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-champagne/10 border border-champagne/30 rounded-sm p-4 mb-8 flex gap-3">
                <FiLock className="text-champagne flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-espresso text-sm">
                    Secure & Encrypted
                  </p>
                  <p className="text-xs text-espresso/70 mt-1 font-light">
                    Your payment information is protected with industry-standard
                    encryption.
                  </p>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-br from-[#E2C766] to-[#C9A535] text-white font-semibold py-4 rounded-sm hover:opacity-90 hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 text-lg tracking-wide"
              >
                {loading
                  ? "Processing..."
                  : `Pay Securely · ₹${booking.totalPrice.toLocaleString()}`}
              </button>

              <p className="text-center text-xs text-espresso/50 mt-6 font-light flex items-center justify-center gap-1">
                <FiLock className="w-3 h-3" /> 256-bit encryption · Powered by
                Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
