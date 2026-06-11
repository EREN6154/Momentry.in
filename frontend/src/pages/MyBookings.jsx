import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookingStore, usePackageStore } from "../store/useStore";
import {
  FiMapPin,
  FiUser,
  FiCheckCircle,
  FiArrowRight,
  FiChevronRight,
} from "react-icons/fi";

export default function MyBookings() {
  const { bookings, fetchBookings } = useBookingStore();
  const { packages } = usePackageStore();
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
      <div className="min-h-screen flex items-center justify-center bg-alabaster">
        <p className="font-serif text-2xl text-espresso animate-pulse">
          Loading your travel hub...
        </p>
      </div>
    );
  }

  // Find the most recent confirmed booking
  const upcomingBooking = bookings?.find((b) => b.status === "confirmed");
  const upcomingPackage = upcomingBooking
    ? packages?.find((p) => p._id === upcomingBooking.packageId)
    : null;

  // Calculate days until departure
  let daysUntilDeparture = 30;
  let formattedDates = "Oct 12 - 19, 2026";
  let departureDayLabel = "Oct 12";

  if (upcomingPackage) {
    const now = new Date();
    const depDate = upcomingPackage.departureDate
      ? new Date(upcomingPackage.departureDate)
      : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const diffTime = depDate.getTime() - now.getTime();
    daysUntilDeparture = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Formatted Dates: e.g. "Oct 12 - 14, 2026"
    const durationDays = upcomingPackage.duration || 2;
    const endDate = new Date(depDate.getTime() + (durationDays - 1) * 24 * 60 * 60 * 1000);
    const options = { month: "short", day: "numeric" };
    formattedDates = `${depDate.toLocaleDateString("en-US", options)} - ${endDate.toLocaleDateString("en-US", { ...options, year: "numeric" })}`;
    departureDayLabel = depDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  const displayBookingId = upcomingBooking
    ? `#BK-${upcomingBooking._id.substring(0, 6).toUpperCase()}`
    : "#BK-9024A1";

  const timelineSteps = [
    {
      label: "Payment Confirmed",
      description: `Receipt & invoice sent to your inbox · Jun 5`,
      completed: true,
      tag: "DONE",
    },
    {
      label: "Hotel & Flight Vouchers Issued",
      description: "Boutique stays + transport itinerary confirmed",
      completed: true,
      tag: "DONE",
      download: true,
    },
    {
      label: "Local Guide Assignment",
      description: "Your storyteller's profile unlocks 48 hrs before departure",
      completed: false,
      inProgress: true,
      tag: "IN PROGRESS",
    },
    {
      label: "Departure",
      description: `${departureDayLabel} · 08:00 AM · Delhi -> ${upcomingPackage?.destination || "Destination"}`,
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F7] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-2">
          Travel Hub
        </h1>
        <p className="text-espresso/60 text-base md:text-lg font-light mb-10">
          Your journey, perfectly organized
        </p>

        {bookings && bookings.length > 0 ? (
          <div className="space-y-12">
            {/* Upcoming Journey Card */}
            {upcomingPackage && (
              <div className="bg-[#F7F3EC] border border-[#C9A535]/30 rounded-sm p-8 md:p-10 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <p className="text-champagne uppercase tracking-[0.2em] text-[10px] font-bold mb-1.5">
                      Upcoming Journey
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso">
                      Trip to {upcomingPackage.title}{" "}
                      <span className="font-sans font-light text-base text-espresso/60 block md:inline md:ml-2">
                        starts in {daysUntilDeparture} days
                      </span>
                    </h2>
                    <p className="text-espresso/60 text-sm font-light mt-2">
                      {formattedDates} · {upcomingBooking.quantity} Traveler
                      {upcomingBooking.quantity > 1 ? "s" : ""} · Booking {displayBookingId}
                    </p>
                  </div>

                  {/* Prep Progress */}
                  <div className="pt-4 max-w-xl">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] text-espresso/50 font-bold tracking-[0.2em]">
                        PREP PROGRESS — 62% READY
                      </p>
                    </div>
                    <div className="w-full bg-espresso/10 rounded-full h-1.5">
                      <div
                        className="bg-champagne h-1.5 rounded-full"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline & Quick Links Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Live Timeline */}
              <div className="lg:col-span-2 bg-white border border-espresso/10 rounded-sm p-6 md:p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-espresso mb-8">
                  Live Timeline
                </h3>

                <div className="space-y-0 pl-2">
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 ${
                            step.completed
                              ? "bg-olive text-white"
                              : step.inProgress
                                ? "bg-champagne text-white"
                                : "bg-[#FAF9F7] text-espresso/40 border border-espresso/20"
                          }`}
                        >
                          {step.completed ? (
                            <FiCheckCircle size={18} />
                          ) : step.inProgress ? (
                            "…"
                          ) : (
                            index + 1
                          )}
                        </div>
                        {index < timelineSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-16 my-1 ${
                              step.completed
                                ? "bg-olive"
                                : "bg-espresso/10 border-l border-dashed border-espresso/20"
                            }`}
                          ></div>
                        )}
                      </div>
                      <div className="pb-8 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p
                            className={`text-base font-semibold ${
                              step.completed || step.inProgress
                                ? "text-espresso"
                                : "text-espresso/40"
                            }`}
                          >
                            {step.label}
                          </p>
                          {step.download && (
                            <a
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              className="text-xs text-champagne font-semibold hover:underline"
                            >
                              [ Download PDF ⬇ ]
                            </a>
                          )}
                          {step.tag && (
                            <span
                              className={`px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-widest ${
                                step.completed
                                  ? "bg-olive/15 text-olive"
                                  : "bg-champagne/15 text-espresso"
                              }`}
                            >
                              {step.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-espresso/50 mt-1 font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Quick Links */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-espresso mb-8">
                  Quick Links
                </h3>
                <div className="space-y-4">
                  {/* Weather */}
                  <div className="bg-white border border-espresso/10 rounded-sm p-5 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-espresso/40 font-bold tracking-[0.2em] mb-1">
                        {upcomingPackage ? upcomingPackage.destination.toUpperCase() : "KYOTO"} WEATHER
                      </p>
                      <p className="text-sm font-semibold text-espresso">28°C · Clear skies</p>
                    </div>
                    <span className="font-serif text-3xl font-bold text-espresso/35">28°</span>
                  </div>

                  {/* Packing Guide */}
                  <div className="bg-white border border-espresso/10 rounded-sm p-5 shadow-sm">
                    <p className="text-[10px] text-espresso/40 font-bold tracking-[0.2em] mb-3">
                      PACKING GUIDE
                    </p>
                    <ul className="text-xs text-espresso/70 space-y-2 font-light">
                      <li>— Passport & visas</li>
                      <li>— Comfortable walking shoes</li>
                      <li>— Light rain jacket</li>
                      <li>— Power adapter</li>
                    </ul>
                  </div>

                  {/* Fellow Travelers */}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="bg-white border border-espresso/10 rounded-sm p-5 shadow-sm hover:border-champagne transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <p className="text-[10px] text-espresso/40 font-bold tracking-[0.2em] mb-1">
                        FELLOW TRAVELERS
                      </p>
                      <p className="text-sm font-semibold text-espresso">Join private group chat</p>
                    </div>
                    <FiArrowRight className="text-espresso/30 group-hover:text-champagne transition" />
                  </a>

                  {/* Concierge */}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="bg-white border border-champagne/45 rounded-sm p-5 shadow-sm hover:border-champagne transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <p className="text-[10px] text-champagne font-bold tracking-[0.2em] mb-1">
                        24/7 CONCIERGE
                      </p>
                      <p className="text-sm font-semibold text-espresso">Chat with us anytime</p>
                    </div>
                    <FiArrowRight className="text-champagne/60 group-hover:text-champagne transition" />
                  </a>
                </div>
              </div>
            </div>

            {/* All Bookings List */}
            <div className="border-t border-espresso/10 pt-10">
              <h3 className="font-serif text-2xl font-bold text-espresso mb-6">
                All Bookings
              </h3>
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const pkg = packages?.find(
                    (p) => p._id === booking.packageId,
                  );
                  return (
                    <div
                      key={booking._id}
                      className="bg-white border border-espresso/10 rounded-sm p-5 hover:border-champagne/50 hover:shadow-md transition"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                        <div>
                          <p className="text-[10px] text-espresso/50 uppercase tracking-widest mb-1">
                            Journey
                          </p>
                          <p className="font-serif text-base font-bold text-espresso">
                            {pkg?.title || "Unknown"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-espresso/50 uppercase tracking-widest mb-1">
                            Destination
                          </p>
                          <p className="text-espresso/80 text-xs font-light">
                            {pkg?.destination || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-espresso/50 uppercase tracking-widest mb-1">
                            Travelers
                          </p>
                          <p className="text-espresso/80 text-xs font-light">
                            {booking.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-espresso/50 uppercase tracking-widest mb-1">
                            Amount
                          </p>
                          <p className="text-sm font-bold text-espresso">
                            ₹{booking.totalPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span
                            className={`px-3 py-1 rounded-sm text-[9px] font-bold tracking-widest ${
                              booking.status === "confirmed"
                                ? "bg-olive/15 text-olive"
                                : booking.status === "pending"
                                  ? "bg-champagne/15 text-champagne"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {booking.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-espresso/10 rounded-sm p-16 text-center">
            <FiMapPin size={40} className="mx-auto text-champagne mb-6" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-espresso mb-3">
              Your adventures await
            </h2>
            <p className="text-espresso/60 text-base font-light mb-8 max-w-md mx-auto">
              You haven't booked any journeys yet. Explore our curated destinations to start.
            </p>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-[#E2C766] to-[#C9A535] text-white font-semibold px-8 py-3.5 rounded-sm hover:opacity-90 hover:shadow-lg transition tracking-wide text-sm"
            >
              Explore Journeys
              <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
