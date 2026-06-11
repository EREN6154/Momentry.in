import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useBookingStore,
  usePackageStore,
  useAuthStore,
} from "../store/useStore";

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const { bookings, fetchBookings } = useBookingStore();
  const { packages } = usePackageStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const booking = bookings?.find((b) => b._id === bookingId);
  const pkg = booking
    ? packages?.find((p) => p._id === booking.packageId)
    : null;

  useEffect(() => {
    if (!pkg) return;

    const targetTime = pkg.departureDate
      ? new Date(pkg.departureDate).getTime()
      : new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        });
      } else {
        setCountdown({ days: 0, hours: 0, mins: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000); // Update every minute is enough and more performant

    return () => clearInterval(timer);
  }, [pkg?.departureDate]);

  if (!booking || !pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alabaster">
        <p className="font-serif text-2xl text-espresso">
          Loading confirmation...
        </p>
      </div>
    );
  }

  const displayBookingId = `#BK-${bookingId.substring(0, 6).toUpperCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayBookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] py-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center w-full">
        {/* Dashed Checkmark Circle */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-champagne flex items-center justify-center bg-[#FAF9F7] relative">
            {/* Minimal Checkmark */}
            <svg
              className="w-8 h-8 text-espresso"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Celebration Message */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4 leading-tight">
          Pack your bags, {user?.name?.split(" ")[0] || "traveler"}!
        </h1>
        <p className="text-lg md:text-xl text-espresso/70 font-light mb-12 max-w-lg mx-auto leading-relaxed">
          It's official — your curation to <span className="font-medium text-espresso">{pkg.destination}</span> is locked in.
        </p>

        {/* Split Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto mb-12">
          {/* Card 1: Booking ID */}
          <div className="bg-white border border-espresso/10 p-6 rounded-md shadow-sm flex flex-col justify-center items-center">
            <p className="text-[10px] text-espresso/50 font-bold tracking-[0.2em] mb-3 uppercase">
              BOOKING ID
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl font-bold text-espresso tracking-wide">
                {displayBookingId}
              </span>
              <button
                onClick={handleCopy}
                className="text-[10px] text-champagne hover:text-espresso font-bold tracking-widest transition uppercase"
              >
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>
          </div>

          {/* Card 2: Countdown */}
          <div className="bg-white border border-espresso/10 p-6 rounded-md shadow-sm flex flex-col justify-center items-center">
            <p className="text-[10px] text-espresso/50 font-bold tracking-[0.2em] mb-3 uppercase">
              DEPARTURE COUNTDOWN
            </p>
            <p className="text-lg font-serif font-bold text-espresso tracking-wide">
              {countdown.days} Days : {String(countdown.hours).padStart(2, "0")} Hrs : {String(countdown.mins).padStart(2, "0")} Min
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/bookings")}
            className="w-full max-w-xs bg-espresso text-white font-semibold py-4 rounded-sm hover:bg-espresso/90 hover:shadow-lg transition tracking-widest text-sm uppercase font-sans mx-auto block"
          >
            Track My Trip
          </button>
          <p className="text-xs text-espresso/50 font-light mt-6 max-w-md mx-auto leading-relaxed">
            A welcome packet & invoice have been dispatched to <span className="font-medium text-espresso">{user?.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
