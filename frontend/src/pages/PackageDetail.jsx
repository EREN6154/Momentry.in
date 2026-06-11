import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  usePackageStore,
  useAuthStore,
  useBookingStore,
} from "../store/useStore";
import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiLock,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

export default function PackageDetail() {
  const { id } = useParams();
  const { packages } = usePackageStore();
  const { user } = useAuthStore();
  const { createBooking } = useBookingStore();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openDay, setOpenDay] = useState(1);
  const [timeLeft, setTimeLeft] = useState(null);

  const pkg = packages?.find((p) => p._id === id);

  useEffect(() => {
    if (!pkg || !pkg.bookingEndDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(pkg.bookingEndDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        return { expired: true };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [pkg?.bookingEndDate]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alabaster">
        <p className="font-serif text-2xl text-espresso">Journey not found</p>
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
    <div className="min-h-screen bg-alabaster">
      {/* Hero Image with Title Overlay */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={
            pkg.image ||
            "https://via.placeholder.com/1200x400?text=" + pkg.destination
          }
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent"></div>

        {/* Badge */}
        <div className="absolute top-6 left-6 bg-champagne text-espresso px-4 py-1 text-xs font-bold tracking-widest rounded-sm">
          CURATED JOURNEY
        </div>

        {/* Title */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-2">
              {pkg.title}
            </h1>
            <p className="text-white/80 text-sm tracking-[0.2em] uppercase">
              {pkg.destination} · {pkg.duration} Days
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm border border-espresso/10 p-8">
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-6 border-y border-espresso/10">
                <div className="flex items-center gap-4">
                  <FiMapPin className="text-2xl text-champagne" />
                  <div>
                    <p className="text-xs text-espresso/50 tracking-widest">
                      DESTINATION
                    </p>
                    <p className="text-lg font-semibold text-espresso">
                      {pkg.destination}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FiClock className="text-2xl text-champagne" />
                  <div>
                    <p className="text-xs text-espresso/50 tracking-widest">
                      DURATION
                    </p>
                    <p className="text-lg font-semibold text-espresso">
                      {pkg.duration} Days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FiUsers className="text-2xl text-champagne" />
                  <div>
                    <p className="text-xs text-espresso/50 tracking-widest">
                      MAX GROUP
                    </p>
                    <p className="text-lg font-semibold text-espresso">
                      {pkg.maxParticipants} People
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="font-serif text-3xl text-espresso mb-4">
                  The Journey
                </h2>
                <p className="text-espresso/70 leading-relaxed font-light">
                  {pkg.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-10">
                <h2 className="font-serif text-3xl text-espresso mb-4">
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {pkg.highlights?.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FiCheckCircle className="text-olive mt-1 flex-shrink-0" />
                      <span className="text-espresso/80 font-light">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-serif text-3xl text-espresso mb-6">
                    Day-by-Day Itinerary
                  </h2>
                  <div className="border border-espresso/10 rounded-sm overflow-hidden bg-white">
                    {pkg.itinerary.map((day, idx) => {
                      const isOpen = openDay === day.day;
                      return (
                        <div
                          key={idx}
                          className={`border-b border-espresso/10 last:border-b-0 transition-colors duration-200 ${isOpen ? 'bg-[#FAF9F7]' : 'bg-white'}`}
                        >
                          <button
                            onClick={() => setOpenDay(isOpen ? null : day.day)}
                            className="w-full flex items-center justify-between p-5 text-left transition focus:outline-none"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] bg-champagne text-espresso font-bold tracking-widest px-2.5 py-1 rounded-sm uppercase">
                                DAY {String(day.day).padStart(2, "0")}
                              </span>
                              <span className="font-serif text-lg font-bold text-espresso">
                                {day.title}
                              </span>
                            </div>
                            <span className="text-espresso/40">
                              {isOpen ? <FiChevronDown size={20} /> : <FiChevronRight size={20} />}
                            </span>
                          </button>
                          
                          {/* Expanded Content */}
                          {isOpen && (
                            <div className="px-5 pb-6 pt-1 border-t border-espresso/5 animate-fadeIn">
                              <p className="text-espresso/70 text-sm font-light leading-relaxed pl-0 sm:pl-16">
                                {day.description}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div>
            <div className="bg-white rounded-sm border border-champagne/40 p-6 sticky top-24 shadow-lg">
              <div className="mb-6">
                <p className="text-xs text-espresso/50 tracking-widest mb-1">
                  FROM
                </p>
                <h3 className="font-serif text-4xl font-bold text-espresso">
                  ₹{pkg.price.toLocaleString()}
                  <span className="text-base font-light text-espresso/60">
                    {" "}
                    / person
                  </span>
                </h3>
              </div>

              {/* Countdown Timer */}
              {timeLeft && (
                <div className="mb-6 p-4 bg-cream/50 border border-champagne/20 rounded-sm">
                  {timeLeft.expired ? (
                    <p className="text-red-700 text-sm font-bold flex items-center justify-center gap-1.5">
                      ⚠️ BOOKING CLOSED
                    </p>
                  ) : (
                    <div className="text-center">
                      <p className="text-[10px] text-espresso/60 font-semibold tracking-wider uppercase mb-1">
                        ⌛ BOOKING CLOSES IN
                      </p>
                      <p className="font-serif text-lg font-bold text-espresso">
                        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                      </p>
                    </div>
                  )}
                </div>
              )}

              {pkg.departureDate && (
                <div className="mb-6 p-4 bg-alabaster border border-espresso/10 rounded-sm flex flex-col justify-center">
                  <p className="text-[10px] text-espresso/50 font-bold tracking-widest uppercase mb-1">
                    DEPARTURE DATE
                  </p>
                  <p className="text-base font-semibold text-espresso">
                    {formatDate(pkg.departureDate)}
                  </p>
                </div>
              )}

              <div className="mb-6 pb-6 border-b border-espresso/10">
                <label className="block text-xs font-bold text-espresso/60 tracking-widest mb-3">
                  TRAVELERS
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-alabaster border border-espresso/20 text-espresso w-10 h-10 rounded-sm flex items-center justify-center hover:border-champagne transition"
                  >
                    −
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
                    className="w-16 text-center border border-espresso/20 rounded-sm py-2 text-espresso focus:outline-none focus:border-champagne"
                  />
                  <button
                    onClick={() =>
                      setQuantity(Math.min(pkg.maxParticipants, quantity + 1))
                    }
                    className="bg-alabaster border border-espresso/20 text-espresso w-10 h-10 rounded-sm flex items-center justify-center hover:border-champagne transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-espresso/10">
                <div className="flex justify-between mb-3 text-sm">
                  <span className="text-espresso/60 font-light">
                    Base price × {quantity}
                  </span>
                  <span className="text-espresso">
                    ₹{(pkg.price * quantity).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-espresso">Total</span>
                  <span className="font-serif text-2xl font-bold text-espresso">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {pkg.isActive && !(timeLeft && timeLeft.expired) ? (
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full bg-gradient-to-br from-[#E2C766] to-[#C9A535] text-white font-semibold py-4 rounded-sm hover:opacity-90 hover:shadow-lg transition disabled:opacity-50 tracking-wide"
                >
                  {loading
                    ? "Processing..."
                    : "Book Now — Secure with Razorpay"}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-espresso/20 text-espresso/50 font-semibold py-4 rounded-sm cursor-not-allowed"
                >
                  {timeLeft && timeLeft.expired ? "Booking Closed" : "Not Available"}
                </button>
              )}

              <p className="text-xs text-espresso/50 text-center mt-4 flex items-center justify-center gap-1">
                <FiLock className="w-3 h-3" />
                Secure payment powered by Razorpay
              </p>

              {/* Trust points */}
              <div className="mt-6 pt-6 border-t border-espresso/10 space-y-2">
                <p className="text-sm text-espresso/70 flex items-center gap-2 font-light">
                  <span className="text-olive">✓</span> Handpicked boutique
                  stays
                </p>
                <p className="text-sm text-espresso/70 flex items-center gap-2 font-light">
                  <span className="text-olive">✓</span> Expert local
                  storytellers
                </p>
                <p className="text-sm text-espresso/70 flex items-center gap-2 font-light">
                  <span className="text-olive">✓</span> 24/7 premium concierge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
