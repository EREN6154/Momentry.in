import React, { useState, useEffect } from "react";
import { usePackageStore, useAuthStore, useBookingStore } from "../store/useStore";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiGrid,
  FiBriefcase,
  FiUsers,
  FiCreditCard,
  FiEdit3,
  FiStar,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Admin() {
  const { packages, fetchPackages, addPackage, updatePackage, deletePackage } =
    usePackageStore();
  const { user, logout } = useAuthStore();
  const { adminStats, fetchAdminStats } = useBookingStore();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    price: "",
    duration: "",
    maxParticipants: "",
    description: "",
    image: "",
    highlights: [],
    itinerary: [],
    departureDate: "",
    bookingEndDate: "",
    difficulty: "Moderate",
    leadGuide: "",
    isActive: true,
  });
  const [highlightInput, setHighlightInput] = useState("");
  const [itineraryInput, setItineraryInput] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPackages();
    fetchAdminStats();
  }, []);

  const handleOpenModal = (pkg = null) => {
    setStep(1);
    if (pkg) {
      setEditingId(pkg._id);
      setFormData({
        ...pkg,
        highlights: pkg.highlights || [],
        itinerary: pkg.itinerary || [],
        departureDate: (pkg.departureDate && !isNaN(new Date(pkg.departureDate).getTime())) 
          ? new Date(pkg.departureDate).toISOString().split('T')[0] 
          : "",
        bookingEndDate: (pkg.bookingEndDate && !isNaN(new Date(pkg.bookingEndDate).getTime())) 
          ? new Date(pkg.bookingEndDate).toISOString().split('T')[0] 
          : "",
        difficulty: pkg.difficulty || "Moderate",
        leadGuide: pkg.leadGuide || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        destination: "",
        price: "",
        duration: "",
        maxParticipants: "",
        description: "",
        image: "",
        highlights: [],
        itinerary: [],
        departureDate: "",
        bookingEndDate: "",
        difficulty: "Moderate",
        leadGuide: "",
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setHighlightInput("");
    setItineraryInput({ title: "", description: "" });
    setStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, highlightInput],
      });
      setHighlightInput("");
    }
  };

  const handleRemoveHighlight = (idx) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== idx),
    });
  };

  const handleAddItineraryDay = () => {
    if (itineraryInput.title.trim() && itineraryInput.description.trim()) {
      const newDayNum = formData.itinerary.length + 1;
      setFormData({
        ...formData,
        itinerary: [
          ...formData.itinerary,
          {
            day: newDayNum,
            title: itineraryInput.title.trim(),
            description: itineraryInput.description.trim(),
          },
        ],
      });
      setItineraryInput({ title: "", description: "" });
    }
  };

  const handleRemoveItineraryDay = (idx) => {
    const filtered = formData.itinerary.filter((_, i) => i !== idx);
    const reindexed = filtered.map((item, index) => ({
      ...item,
      day: index + 1,
    }));
    setFormData({
      ...formData,
      itinerary: reindexed,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      maxParticipants: parseInt(formData.maxParticipants),
    };

    let result;
    if (editingId) {
      result = await updatePackage(editingId, submitData);
    } else {
      result = await addPackage(submitData);
    }

    if (result.success) {
      handleCloseModal();
      fetchPackages();
    }

    setLoading(false);
  };

  const handleDelete = async (pkgId) => {
    if (confirm("Are you sure you want to delete this package?")) {
      const result = await deletePackage(pkgId);
      if (result.success) {
        fetchPackages();
      }
    }
  };

  const handleToggleActive = async (pkg) => {
    const result = await updatePackage(pkg._id, {
      ...pkg,
      isActive: !pkg.isActive,
    });
    if (result.success) {
      fetchPackages();
    }
  };

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const activeTrips = packages?.filter((p) => p.isActive).length || 0;
  const totalTrips = packages?.length || 0;

  const menuItems = [
    { id: "dashboard", icon: FiGrid, label: "Dashboard Overview" },
    { id: "trips", icon: FiBriefcase, label: "Manage Trips" },
    { id: "users", icon: FiUsers, label: "Users & Bookings", soon: true },
    {
      id: "financials",
      icon: FiCreditCard,
      label: "Financials (Razorpay)",
      soon: true,
    },
    { id: "cms", icon: FiEdit3, label: "Content Manager", soon: true },
    { id: "reviews", icon: FiStar, label: "Review Moderation", soon: true },
    {
      id: "inquiries",
      icon: FiMessageSquare,
      label: "Inquiries Log",
      soon: true,
    },
  ];

  const kpis = [
    { label: "REVENUE (MTD)", value: "₹42.8L", note: "+12.4% vs last month" },
    { label: "BOOKINGS", value: "312", note: "+8.2% vs last month" },
    {
      label: "ACTIVE TRIPS",
      value: activeTrips,
      note: `${totalTrips} total trips`,
    },
    { label: "AVG. RATING", value: "4.9 ★", note: "Based on 86 reviews" },
  ];

  return (
    <div className="min-h-screen bg-alabaster flex">
      {/* ===== Dark Sidebar ===== */}
      <aside className="hidden md:flex flex-col w-64 bg-espresso text-white min-h-screen sticky top-0 self-start h-screen">
        <div className="p-6 border-b border-white/10">
          <p className="font-serif text-2xl font-bold">
            MOMENTRY<span className="text-champagne">.</span>
          </p>
          <p className="text-[10px] tracking-[0.3em] text-white/50 mt-1">
            ADMIN
          </p>
        </div>

        <nav className="flex-1 py-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => !item.soon && setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm text-left transition ${
                activeMenu === item.id
                  ? "bg-white/10 border-l-4 border-champagne text-white"
                  : item.soon
                    ? "text-white/30 cursor-default"
                    : "text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
              }`}
            >
              <item.icon size={16} />
              <span className="flex-1">{item.label}</span>
              {item.soon && (
                <span className="text-[9px] tracking-widest text-white/30">
                  SOON
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 space-y-3">
          <button className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition w-full">
            <FiSettings size={16} /> Settings
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition w-full"
          >
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-6 md:p-10">
        {/* Greeting Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso">
              {greeting}, {user?.name?.split(" ")[0] || "Admin"} ☀
            </h1>
            <p className="text-espresso/50 text-sm font-light mt-1">
              {today} · {activeTrips} active trips
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-gradient-to-br from-[#E2C766] to-[#C9A535] text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 hover:shadow-lg transition tracking-wide"
          >
            <FiPlus /> Add New Trip
          </button>
        </div>

        {/* KPI Cards */}
        {activeMenu === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                label: "REVENUE (MTD)",
                value: adminStats ? `₹${(adminStats.mtdRevenue / 100000).toFixed(1)}L` : "₹42.8L",
                note: "+12.4% vs last month",
              },
              {
                label: "BOOKINGS",
                value: adminStats ? adminStats.totalBookings : "312",
                note: "+8.2% vs last month",
              },
              {
                label: "ACTIVE TRIPS",
                value: adminStats ? adminStats.activeTrips : activeTrips,
                note: `${packages?.length || 0} total trips`,
              },
              {
                label: "AVG. RATING",
                value: adminStats ? `${adminStats.avgRating} ★` : "4.9 ★",
                note: "Based on 86 reviews",
              },
            ].map((kpi, i) => (
              <div
                key={i}
                className="bg-white border border-espresso/10 rounded-sm p-6"
              >
                <p className="text-[10px] text-espresso/50 font-bold tracking-[0.2em] mb-3">
                  {kpi.label}
                </p>
                <p className="font-serif text-4xl font-bold text-espresso mb-2">
                  {kpi.value}
                </p>
                <p className="text-xs text-olive font-light">{kpi.note}</p>
              </div>
            ))}
          </div>
        )}

        {/* Side-by-Side Dashboard Panels */}
        {activeMenu === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Left Panel: Bookings — Last 7 Days (2 cols on lg) */}
            <div className="lg:col-span-2 bg-white border border-espresso/10 rounded-sm p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-espresso">Bookings — Last 7 Days</h3>
                  <p className="text-espresso/50 text-xs font-light">Daily booking counts and performance</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-espresso">{adminStats ? adminStats.totalBookings : "312"} Total</p>
                  <p className="text-olive text-[10px] font-semibold tracking-wider">+8.2% VS LAST WEEK</p>
                </div>
              </div>

              {/* Bar Chart Container */}
              <div className="h-64 flex items-end justify-between pt-4 gap-3 md:gap-6 border-b border-espresso/10 pb-2">
                {(() => {
                  const maxCount = Math.max(5, ...(adminStats?.bookingsChart?.map(b => b.count) || []));
                  const chartData = adminStats?.bookingsChart || [
                    { day: "Sat", count: 24 },
                    { day: "Sun", count: 40 },
                    { day: "Mon", count: 15 },
                    { day: "Tue", count: 32 },
                    { day: "Wed", count: 28 },
                    { day: "Thu", count: 48, active: true },
                    { day: "Fri", count: 35 },
                  ];

                  return chartData.map((bar, index) => {
                    const percent = Math.round((bar.count / maxCount) * 100);
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer h-full justify-end">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-espresso text-white text-[10px] font-bold py-1 px-2 rounded-sm mb-2 shadow-md">
                          {bar.count}
                        </span>
                        <div 
                          className={`w-full max-w-[32px] rounded-t-sm transition-all duration-500 ease-out hover:brightness-105 ${
                            bar.active || (!adminStats && bar.day === "Thu")
                              ? "bg-gradient-to-t from-[#C9A535] to-[#E2C766] shadow-sm" 
                              : "bg-espresso/15 group-hover:bg-espresso/25"
                          }`}
                          style={{ height: `${percent}%` }}
                        ></div>
                        <span className={`text-[11px] font-medium tracking-wide mt-2 ${(bar.active || (!adminStats && bar.day === "Thu")) ? "text-champagne font-bold" : "text-espresso/60"}`}>
                          {bar.day}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Right Panel: Recent Bookings */}
            <div className="bg-white border border-espresso/10 rounded-sm p-6 md:p-8 shadow-sm flex flex-col">
              <h3 className="font-serif text-2xl font-bold text-espresso mb-1">Recent Bookings</h3>
              <p className="text-espresso/50 text-xs font-light mb-6">Latest transaction logs</p>

              <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px]">
                {(() => {
                  const bookingsList = adminStats?.recentBookings?.length > 0
                    ? adminStats.recentBookings.map(b => {
                        const initials = b.userId?.name 
                          ? b.userId.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) 
                          : "TR";
                        const formattedAmount = b.totalPrice !== undefined && b.totalPrice !== null
                          ? `₹${b.totalPrice.toLocaleString("en-IN")}`
                          : "₹0";
                        const statusColor = b.status === "confirmed" 
                          ? "bg-olive/10 text-olive border-olive/20" 
                          : b.status === "pending"
                            ? "bg-[#F7F3EC] text-[#C9A535] border-[#C9A535]/20"
                            : "bg-red-50 text-red-700 border-red-200";
                        const displayStatus = b.status 
                          ? (b.status.toUpperCase() === "CONFIRMED" ? "PAID" : b.status.toUpperCase()) 
                          : "PENDING";
                        return {
                          name: b.userId?.name || "Traveler",
                          dest: b.packageId?.destination || "Destination",
                          amount: formattedAmount,
                          status: displayStatus,
                          initials,
                          color: statusColor
                        };
                      })
                    : [
                        { name: "Aanya K.", dest: "Kyoto", amount: "₹1.8L", status: "PAID", initials: "AK", color: "bg-olive/10 text-olive border-olive/20" },
                        { name: "Dev M.", dest: "Sahara", amount: "₹2.4L", status: "PAID", initials: "DM", color: "bg-olive/10 text-olive border-olive/20" },
                        { name: "Sara I.", dest: "Bali", amount: "₹1.2L", status: "PENDING", initials: "SI", color: "bg-[#F7F3EC] text-[#C9A535] border-[#C9A535]/20" },
                        { name: "Kabir S.", dest: "Spiti", amount: "₹95K", status: "PAID", initials: "KS", color: "bg-olive/10 text-olive border-olive/20" },
                        { name: "Nina P.", dest: "Lisbon", amount: "₹3.1L", status: "REFUNDED", initials: "NP", color: "bg-red-50 text-red-700 border-red-200" },
                      ];

                  return bookingsList.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-espresso/5 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#FAF9F7] border border-espresso/10 flex items-center justify-center text-xs font-bold text-espresso">
                          {item.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-espresso">{item.name}</p>
                          <p className="text-xs text-espresso/50 font-light">{item.dest}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-espresso">{item.amount}</p>
                        <span className={`inline-block px-2 py-0.5 rounded-sm text-[8px] font-bold tracking-wider border mt-1 ${item.color}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Trips Table (Only on activeMenu === "trips") */}
        {activeMenu === "trips" && (
          <div className="bg-white border border-espresso/10 rounded-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-espresso/10">
              <h2 className="font-serif text-xl font-bold text-espresso">
                Manage Trips
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-alabaster border-b border-espresso/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-[11px] font-bold text-espresso/60 tracking-widest">
                      TRIP
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-bold text-espresso/60 tracking-widest">
                      DESTINATION
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-bold text-espresso/60 tracking-widest">
                      PRICE
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-bold text-espresso/60 tracking-widest">
                      DURATION
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-bold text-espresso/60 tracking-widest">
                      STATUS
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-bold text-espresso/60 tracking-widest">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {packages?.map((pkg) => (
                    <tr
                      key={pkg._id}
                      className="border-b border-espresso/5 hover:bg-alabaster/50"
                    >
                      <td className="px-6 py-4 text-espresso font-semibold">
                        {pkg.title}
                      </td>
                      <td className="px-6 py-4 text-espresso/60 font-light">
                        {pkg.destination}
                      </td>
                      <td className="px-6 py-4 text-espresso">
                        ₹{pkg.price !== undefined && pkg.price !== null ? pkg.price.toLocaleString() : "0"}
                      </td>
                      <td className="px-6 py-4 text-espresso/60 font-light">
                        {pkg.duration} days
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest ${
                            pkg.isActive
                              ? "bg-olive/15 text-olive"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {pkg.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenModal(pkg)}
                            className="text-champagne hover:text-espresso transition text-lg"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleToggleActive(pkg)}
                            className="text-espresso/50 hover:text-espresso transition text-xs font-bold tracking-wide"
                          >
                            {pkg.isActive ? "DEACTIVATE" : "ACTIVATE"}
                          </button>
                          <button
                            onClick={() => handleDelete(pkg._id)}
                            className="text-red-500 hover:text-red-700 transition text-lg"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {(!packages || packages.length === 0) && (
              <div className="text-center py-12 text-espresso/60">
                <p className="mb-4 font-light">No trips yet</p>
                <button
                  onClick={() => handleOpenModal()}
                  className="inline-block bg-gradient-to-br from-[#E2C766] to-[#C9A535] text-white font-semibold px-6 py-2 rounded-sm hover:opacity-90 transition"
                >
                  Create First Trip
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ===== Add/Edit Trip Modal (5-Step Stepper Wizard) ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-espresso/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-espresso/10 sticky top-0 bg-white z-10">
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso">
                  {editingId ? "Edit Trip" : "Add New Trip"}
                </h2>
                {/* Stepper progress indicator */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {[
                    { number: 1, label: "BASIC INFO" },
                    { number: 2, label: "MEDIA" },
                    { number: 3, label: "ITINERARY" },
                    { number: 4, label: "STAYS & GUIDES" },
                    { number: 5, label: "PUBLISH" }
                  ].map((s) => (
                    <React.Fragment key={s.number}>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingId || s.number < step) {
                            setStep(s.number);
                          }
                        }}
                        className={`text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full transition-all ${
                          step === s.number
                            ? "bg-espresso text-white shadow-sm"
                            : step > s.number
                              ? "bg-olive text-white"
                              : "bg-[#FAF9F7] text-espresso/45 border border-espresso/10"
                        }`}
                      >
                        {step > s.number ? "✓" : `● ${s.number}`} {s.label}
                      </button>
                      {s.number < 5 && <span className="text-espresso/20 text-[9px]">—</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-2xl text-espresso/50 hover:text-espresso"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* STEP 1: BASIC INFO */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-espresso/50 tracking-[0.2em] uppercase">Step 1: Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Trip Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Kyoto Cherry Blossom Curation"
                        required
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Destination *</label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        placeholder="e.g. Kyoto, Japan"
                        required
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Price (₹) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="e.g. 180000"
                        required
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Duration (Days) *</label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g. 7"
                        required
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Overview Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the mood, experiences, and flow of the curation..."
                      rows="4"
                      required
                      className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: MEDIA & HIGHLIGHTS */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-espresso/50 tracking-[0.2em] uppercase">Step 2: Media & Highlights</h3>

                  <div className="flex flex-col space-y-3">
                    <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider">Cover Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Paste cover photo URL (e.g. https://images.unsplash.com/...)"
                      className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                    />
                    
                    {/* Visual image preview / drop-zone box */}
                    <div className="w-full h-48 rounded-sm border border-dashed border-espresso/20 bg-[#FAF9F7] flex items-center justify-center overflow-hidden">
                      {formData.image ? (
                        <img 
                          src={formData.image} 
                          alt="Cover Preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60";
                          }}
                        />
                      ) : (
                        <div className="text-center p-6">
                          <p className="text-xs text-espresso/40 font-light mb-1">Image URL Preview Area</p>
                          <p className="text-[10px] text-espresso/35 font-light">Paste a valid web image link above to inspect the banner</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights Builder */}
                  <div className="border-t border-espresso/10 pt-5 space-y-3">
                    <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider">Highlights Badge Editor</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={highlightInput}
                        onChange={(e) => setHighlightInput(e.target.value)}
                        placeholder="e.g. Boutique stays · Private guides · Michelin dinners"
                        className="flex-1 px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="bg-espresso text-white px-6 py-2 rounded-sm hover:bg-espresso/80 transition text-sm font-semibold"
                      >
                        Add Tag
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.highlights.length > 0 ? (
                        formData.highlights.map((h, idx) => (
                          <span
                            key={idx}
                            className="bg-champagne/15 text-espresso border border-champagne/30 px-3 py-1.5 rounded-sm text-xs flex items-center gap-2 font-medium"
                          >
                            {h}
                            <button
                              type="button"
                              onClick={() => handleRemoveHighlight(idx)}
                              className="text-champagne hover:text-espresso font-bold text-sm"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-espresso/40 font-light italic">No highlight tags added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DAY ITINERARY */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-espresso/50 tracking-[0.2em] uppercase">Step 3: Day-by-Day Itinerary</h3>

                  <div className="bg-[#FAF9F7] p-5 border border-espresso/15 rounded-sm space-y-3">
                    <p className="text-[10px] text-champagne font-bold tracking-widest uppercase">
                      ADD DAY {formData.itinerary.length + 1} TO ITINERARY
                    </p>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={itineraryInput.title}
                        onChange={(e) => setItineraryInput({ ...itineraryInput, title: e.target.value })}
                        placeholder="Day Title (e.g. Arrival & Twilight Walk)"
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm text-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                      <textarea
                        value={itineraryInput.description}
                        onChange={(e) => setItineraryInput({ ...itineraryInput, description: e.target.value })}
                        placeholder="Day Description (Describe today's stops, transfers, guides, dining...)"
                        rows="3"
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm text-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddItineraryDay}
                        className="bg-espresso text-white px-6 py-2.5 rounded-sm hover:bg-espresso/80 transition text-xs font-bold tracking-wider uppercase ml-auto block"
                      >
                        Add Day {formData.itinerary.length + 1}
                      </button>
                    </div>
                  </div>

                  {/* List of itinerary days */}
                  <div className="space-y-3">
                    <p className="text-[10px] text-espresso/50 font-bold tracking-wider uppercase">ITINERARY PREVIEW ({formData.itinerary.length} DAYS)</p>
                    {formData.itinerary.length > 0 ? (
                      <div className="space-y-3 max-h-[260px] overflow-y-auto border border-espresso/10 p-3 rounded-sm bg-white">
                        {formData.itinerary.map((day, idx) => (
                          <div key={idx} className="flex gap-4 items-start justify-between p-4 bg-[#FAF9F7] border border-espresso/5 rounded-sm hover:border-champagne/45 transition">
                            <div className="flex-1">
                              <p className="text-[10px] text-champagne font-bold tracking-wider uppercase mb-1">
                                DAY {day.day}
                              </p>
                              <h4 className="text-sm font-semibold text-espresso mb-1">{day.title}</h4>
                              <p className="text-xs text-espresso/60 font-light leading-relaxed">{day.description}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveItineraryDay(idx)}
                              className="text-red-500 hover:text-red-700 font-bold text-xs transition uppercase tracking-wider"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-espresso/40 font-light italic">No itinerary days added yet. Please define at least Day 1 to help travelers learn the trip plan.</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: STAYS & GUIDES */}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-espresso/50 tracking-[0.2em] uppercase">Step 4: Scheduling & Logistics</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Departure Date *</label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Booking Deadline (Countdown Timer End) *</label>
                      <input
                        type="date"
                        name="bookingEndDate"
                        value={formData.bookingEndDate}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Max Group Size *</label>
                      <input
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        placeholder="e.g. 12"
                        required
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Difficulty level</label>
                      <select 
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Challenging">Challenging</option>
                        <option value="Extreme">Extreme</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] text-espresso/60 font-bold uppercase tracking-wider mb-1">Lead Guide</label>
                      <input
                        type="text"
                        name="leadGuide"
                        value={formData.leadGuide}
                        onChange={handleInputChange}
                        placeholder="e.g. Kenji Sato"
                        className="px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-champagne text-espresso bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & PUBLISH */}
              {step === 5 && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-espresso/50 tracking-[0.2em] uppercase">Step 5: Review & Publish</h3>

                  <div className="border border-espresso/10 rounded-sm p-5 space-y-4 bg-[#FAF9F7]">
                    <h4 className="font-serif text-lg font-bold text-espresso">Review Trip Details</h4>

                    <div className="grid grid-cols-2 gap-4 text-xs font-light">
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Title</p>
                        <p className="text-espresso font-semibold">{formData.title || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Destination</p>
                        <p className="text-espresso font-semibold">{formData.destination || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Price</p>
                        <p className="text-espresso font-semibold">₹{(formData.price || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Duration</p>
                        <p className="text-espresso font-semibold">{formData.duration || 0} Days</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Departure Date</p>
                        <p className="text-espresso font-semibold">{formData.departureDate || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Booking Deadline</p>
                        <p className="text-espresso font-semibold">{formData.bookingEndDate || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Difficulty</p>
                        <p className="text-espresso font-semibold">{formData.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Lead Guide</p>
                        <p className="text-espresso font-semibold">{formData.leadGuide || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Itinerary Duration</p>
                        <p className="text-espresso font-semibold">{formData.itinerary.length} Days defined</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-espresso/45 font-bold uppercase tracking-wider">Highlights</p>
                        <p className="text-espresso font-semibold">{formData.highlights.length} Tags defined</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#C9A535]"
                      />
                      <span className="text-espresso text-sm font-semibold">
                        Publish active to Momentry website (visible to public search)
                      </span>
                    </label>
                    <p className="text-[10px] text-espresso/50 pl-7 leading-relaxed font-light">
                      If disabled, this curation will remain saved in the database but won't be indexable or bookable by customers online.
                    </p>
                  </div>
                </div>
              )}

              {/* FOOTER WIZARD CONTROLS */}
              <div className="flex gap-4 pt-4 border-t border-espresso/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 border-2 border-espresso text-espresso font-semibold py-3 rounded-sm hover:bg-espresso hover:text-white transition text-sm tracking-wider uppercase font-sans"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 border-2 border-espresso text-espresso font-semibold py-3 rounded-sm hover:bg-espresso hover:text-white transition text-sm tracking-wider uppercase font-sans"
                  >
                    Cancel
                  </button>
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1) {
                        if (!formData.title || !formData.destination || !formData.price || !formData.duration || !formData.description) {
                          alert("Please fill in all required fields.");
                          return;
                        }
                      }
                      if (step === 4) {
                        if (!formData.departureDate || !formData.bookingEndDate || !formData.maxParticipants) {
                          alert("Please fill in departure date, booking deadline, and max group size.");
                          return;
                        }
                      }
                      setStep(step + 1);
                    }}
                    className="flex-1 bg-espresso text-white font-semibold py-3 rounded-sm hover:bg-espresso/90 transition text-sm tracking-wider uppercase font-sans border-2 border-transparent"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-br from-[#E2C766] to-[#C9A535] text-white font-semibold py-3 rounded-sm hover:opacity-90 hover:shadow-lg transition disabled:opacity-50 text-sm tracking-wider uppercase font-sans border-2 border-transparent"
                  >
                    {loading ? "Saving..." : "Save & Publish"}
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
