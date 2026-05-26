import express from "express";
import {
  createDonationOrder,
  getDonationStats,
  getDonations,
  verifyDonationPayment
} from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", createDonationOrder);
router.post("/verify-payment", verifyDonationPayment);
router.get("/", protect, getDonations);
router.get("/stats", protect, getDonationStats);

export default router;
