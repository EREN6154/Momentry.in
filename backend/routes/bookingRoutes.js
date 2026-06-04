import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
} from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, getUserBookings);
router.get("/:id", verifyToken, getBookingById);
router.put("/:id", verifyToken, updateBooking);

export default router;
