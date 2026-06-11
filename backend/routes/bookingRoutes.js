import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  getAdminDashboardStats,
} from "../controllers/bookingController.js";
import { verifyToken, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, getUserBookings);
router.get("/admin/dashboard", verifyToken, adminOnly, getAdminDashboardStats);
router.get("/:id", verifyToken, getBookingById);
router.put("/:id", verifyToken, updateBooking);

export default router;
