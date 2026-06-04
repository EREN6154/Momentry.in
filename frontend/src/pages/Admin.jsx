import React, { useState, useEffect } from "react";
import { usePackageStore, useAuthStore } from "../store/useStore";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";

export default function Admin() {
  const { packages, fetchPackages, addPackage, updatePackage, deletePackage } =
    usePackageStore();
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    price: "",
    duration: "",
    maxParticipants: "",
    description: "",
    image: "",
    highlights: [],
    isActive: true,
  });
  const [highlightInput, setHighlightInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleOpenModal = (pkg = null) => {
    if (pkg) {
      setEditingId(pkg._id);
      setFormData(pkg);
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
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setHighlightInput("");
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#A8D5E2] text-white px-6 py-3 rounded-lg hover:bg-blue-300 transition"
          >
            <FiPlus /> Add Package
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingId ? "Edit Package" : "Add New Package"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-2xl text-gray-600 hover:text-gray-800"
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Package Title"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5E2]"
                  />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Destination"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5E2]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Price (₹)"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5E2]"
                  />
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Duration (days)"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5E2]"
                  />
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    placeholder="Max Participants"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5E2]"
                  />
                </div>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5E2]"
                />

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5E2]"
                />

                <div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      placeholder="Add highlight"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5E2]"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="bg-[#B4E7E1] text-white px-4 py-2 rounded-lg hover:bg-teal-400 transition"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {h}
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          className="hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Active</span>
                </label>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#A8D5E2] text-white font-bold py-2 rounded-lg hover:bg-blue-300 transition disabled:bg-gray-400"
                  >
                    {loading ? "Saving..." : "Save Package"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Packages Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages?.map((pkg) => (
                  <tr key={pkg._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800 font-semibold">
                      {pkg.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {pkg.destination}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      ₹{pkg.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {pkg.duration} days
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          pkg.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {pkg.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleOpenModal(pkg)}
                        className="text-[#A8D5E2] hover:text-blue-400 transition text-xl"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleToggleActive(pkg)}
                        className="text-[#B4E7E1] hover:text-teal-600 transition text-sm font-bold"
                      >
                        {pkg.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        className="text-red-600 hover:text-red-800 transition text-xl"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!packages ||
            (packages.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                <p className="mb-4">No packages yet</p>
                <button
                  onClick={() => handleOpenModal()}
                  className="inline-block bg-[#A8D5E2] text-white px-6 py-2 rounded-lg hover:bg-blue-300 transition"
                >
                  Create First Package
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
