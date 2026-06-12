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
  FiCheck,
  FiStar,
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

  const [activeTab, setActiveTab] = useState("journey");

  const totalPrice = pkg.price * quantity;

  // Render content depending on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "journey":
        return (
          <div className="space-y-0">
            {pkg.itinerary && pkg.itinerary.length > 0 ? (
              pkg.itinerary.map((day, idx) => {
                const isOpen = openDay === day.day;
                return (
                  <div
                    key={idx}
                    className="border-b border-espresso/10 py-5 last:border-b-0"
                  >
                    <button
                      onClick={() => setOpenDay(isOpen ? null : day.day)}
                      className="w-full flex items-center justify-between text-left transition focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-champagne font-semibold">
                          DAY {String(day.day).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-lg md:text-xl font-bold text-espresso hover:text-champagne transition-colors">
                          {day.title}
                        </span>
                      </div>
                      <span className="text-espresso/40 ml-2">
                        {isOpen ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                      </span>
                    </button>
                    
                    {/* Expanded Content */}
                    {isOpen && (
                      <div className="mt-4 pl-0 md:pl-[64px] animate-fadeIn">
                        <p className="text-espresso/70 text-sm md:text-base font-light leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <p className="text-espresso/60 font-light italic">No itinerary details available.</p>
            )}
          </div>
        );
      case "stays":
        return (
          <div className="space-y-6">
            <div className="border border-espresso/10 p-6 bg-white rounded-md">
              <span className="text-[10px] text-champagne font-bold tracking-widest uppercase">PRIMARY LODGING</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-1 mb-2">Heritage Machiya Townhouse</h3>
              <p className="text-espresso/70 text-sm font-light leading-relaxed">
                Stay in a meticulously restored historical machiya residence. Features traditional paper sliding doors, tatami mats, and modern luxury amenities to give you an authentic Kyoto home experience.
              </p>
            </div>
            <div className="border border-espresso/10 p-6 bg-white rounded-md">
              <span className="text-[10px] text-champagne font-bold tracking-widest uppercase">RETREAT RETREAT</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-1 mb-2">Private Onsen Ryokan</h3>
              <p className="text-espresso/70 text-sm font-light leading-relaxed">
                Rejuvenate at a high-end hot spring resort. Unwind in mineral-rich outdoor thermal baths and indulge in multi-course kaiseki dinners crafted with seasonal regional ingredients.
              </p>
            </div>
          </div>
        );
      case "included":
        return (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-espresso mb-4">What's Included in Your Journey</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pkg.highlights?.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white border border-espresso/5 p-4 rounded-md">
                  <FiCheck className="text-olive mt-1 flex-shrink-0 text-lg stroke-[3]" />
                  <span className="text-espresso/80 text-sm font-light">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="flex items-center gap-6 p-6 border border-espresso/10 rounded-md bg-white">
              <div className="text-center border-r border-espresso/10 pr-6">
                <span className="text-5xl font-serif font-bold text-espresso">4.9</span>
                <p className="text-xs text-espresso/50 tracking-wide mt-1">out of 5 stars</p>
              </div>
              <div>
                <div className="flex text-[#E2C766] gap-1 text-lg mb-1">
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                </div>
                <p className="text-sm font-medium text-espresso">212 Verified Reviews</p>
                <p className="text-xs text-espresso/50 font-light mt-0.5">100% of guests recommend this trip.</p>
              </div>
            </div>

            {/* Guest Reviews */}
            <div className="space-y-4">
              <div className="border border-espresso/5 p-5 bg-white rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-espresso text-sm">Aanya Kapoor</span>
                  <span className="text-xs text-espresso/40">Verified Traveler · Jun 2026</span>
                </div>
                <p className="text-espresso/70 text-sm font-light leading-relaxed">
                  "An absolute dream! The local storytellers in Gion were fantastic, and sleeping in the machiya townhouse was an unforgettable experience. The attention to detail was incredible."
                </p>
              </div>
              <div className="border border-espresso/5 p-5 bg-white rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-espresso text-sm">Kabir Mehta</span>
                  <span className="text-xs text-espresso/40">Verified Traveler · May 2026</span>
                </div>
                <p className="text-espresso/70 text-sm font-light leading-relaxed">
                  "Perfect curation. The Arashiyama bamboo forest tour and private tea master ceremony were highlights. Recommended for anyone seeking deep cultural immersion."
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        
        {/* Dark Blue Hero Banner Card */}
        <div className="relative bg-[#1F323A] rounded-2xl p-8 md:p-12 mb-10 overflow-hidden shadow-lg min-h-[200px] flex flex-col justify-end">
          {/* Decorative background image blend */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url(${pkg.image || ''})` }}
          />
          
          {/* Badge */}
          <div className="absolute top-6 left-6 bg-[#C9A535] text-white px-3 py-1 text-[10px] font-bold tracking-widest rounded uppercase">
            Best Seller
          </div>

          {/* Banner Contents */}
          <div className="relative z-10">
            <h1 className="font-serif text-3xl md:text-5xl text-white mb-3">
              {pkg.title}
            </h1>
            <p className="text-white/80 text-xs md:text-sm tracking-widest uppercase font-light">
              {pkg.destination} · {pkg.duration} DAYS / {pkg.duration - 1} NIGHTS · ★ 4.9 (212 verified reviews)
            </p>
          </div>
        </div>

        {/* Page Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Details & Tabs */}
          <div className="lg:col-span-2">
            
            {/* Tab Bar Navigation */}
            <div className="flex border-b border-espresso/10 mb-8 overflow-x-auto gap-8">
              {[
                { id: "journey", label: "The Journey" },
                { id: "stays", label: "Stays & Comfort" },
                { id: "included", label: "What's Included" },
                { id: "reviews", label: "Reviews" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-sm font-semibold tracking-wide border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-[#C9A535] text-espresso"
                      : "border-transparent text-espresso/40 hover:text-espresso/70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents Panel */}
            <div className="animate-fadeIn">
              {renderTabContent()}
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div>
            <div className="bg-white border border-[#E5E0D5] rounded-2xl p-6 sticky top-24 shadow-md">
              <div className="mb-6">
                <p className="text-[10px] text-espresso/40 tracking-widest uppercase font-bold mb-1">
                  From
                </p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-espresso">
                  ₹{pkg.price.toLocaleString()}
                  <span className="text-sm font-light text-espresso/50"> / person</span>
                </h3>
              </div>

              {/* Departure and Travelers Custom Split Input Panel */}
              <div className="grid grid-cols-2 gap-0 border border-espresso/10 rounded-xl mb-6 overflow-hidden bg-[#FAF8F5]">
                <div className="p-3.5 border-r border-espresso/10 flex flex-col justify-center">
                  <span className="text-[9px] text-espresso/40 font-bold tracking-widest uppercase">
                    DEPARTURE
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-espresso mt-1">
                    {pkg.departureDate ? formatDate(pkg.departureDate) : "Oct 12, 2026"}
                  </span>
                </div>
                <div className="p-3.5 flex flex-col justify-center relative">
                  <span className="text-[9px] text-espresso/40 font-bold tracking-widest uppercase">
                    TRAVELERS
                  </span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="text-xs md:text-sm font-semibold text-espresso mt-1 bg-transparent border-none focus:outline-none appearance-none cursor-pointer pr-6 w-full font-sans"
                  >
                    {[...Array(pkg.maxParticipants || 10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 bottom-4 text-espresso/40">
                    <FiChevronDown size={14} />
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              {pkg.isActive && !(timeLeft && timeLeft.expired) ? (
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white font-semibold py-4 rounded-xl shadow transition duration-200 disabled:opacity-50 tracking-wider text-sm font-sans"
                >
                  {loading ? "Processing..." : "Book Now — Secure with Razorpay"}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-espresso/10 text-espresso/40 font-semibold py-4 rounded-xl cursor-not-allowed text-sm"
                >
                  {timeLeft && timeLeft.expired ? "Booking Closed" : "Not Available"}
                </button>
              )}

              <p className="text-[11px] text-espresso/50 text-center mt-3">
                Free cancellation up to 30 days before departure
              </p>

              <hr className="my-5 border-espresso/5" />

              {/* Value Checkmarks */}
              <div className="space-y-3">
                {[
                  "Handpicked boutique stays",
                  "Expert local storytellers",
                  "24/7 premium concierge"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-espresso/70 font-light">
                    <FiCheck className="text-espresso/60 text-sm flex-shrink-0 stroke-[3.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
