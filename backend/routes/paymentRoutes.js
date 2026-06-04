import express from "express";
import {
  createOrder,
  verifyPayment,
  getPaymentStatus,
} from "../controllers/paymentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.post("/verify", verifyToken, verifyPayment);
router.get("/:id", verifyToken, getPaymentStatus);

export default router;
