import create from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { user, token, isAdmin } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
      set({ user, token, isAdmin });
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  },

  signup: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      set({ user, token, isAdmin: false });
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed",
      };
    }
  },

  googleLogin: async (credentialResponse) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        token: credentialResponse.credential,
      });
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      set({ user, token, isAdmin: false });
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Google login failed",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    set({ user: null, token: null, isAdmin: false });
  },
}));

export const usePackageStore = create((set, get) => ({
  packages: [],
  filteredPackages: [],
  selectedPackage: null,
  loading: false,

  fetchPackages: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/packages`);
      set({
        packages: response.data,
        filteredPackages: response.data,
        loading: false,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch packages:", error);
      set({ loading: false });
    }
  },

  filterPackages: (filters) => {
    const { packages } = get();
    let filtered = packages;

    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.destination.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.duration) {
      filtered = filtered.filter((p) => p.duration === filters.duration);
    }

    if (filters.destination) {
      filtered = filtered.filter((p) => p.destination === filters.destination);
    }

    set({ filteredPackages: filtered });
  },

  setSelectedPackage: (packageData) => {
    set({ selectedPackage: packageData });
  },

  addPackage: async (packageData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/packages`, packageData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { packages } = get();
      set({ packages: [...packages, response.data] });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  updatePackage: async (packageId, packageData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/packages/${packageId}`,
        packageData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { packages } = get();
      const updatedPackages = packages.map((p) =>
        p._id === packageId ? response.data : p,
      );
      set({ packages: updatedPackages });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  deletePackage: async (packageId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/packages/${packageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { packages } = get();
      set({ packages: packages.filter((p) => p._id !== packageId) });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },
}));

export const useBookingStore = create((set) => ({
  bookings: [],
  currentBooking: null,

  createBooking: async (packageId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/bookings`,
        { packageId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      set({ currentBooking: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  fetchBookings: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ bookings: response.data });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  },
}));
