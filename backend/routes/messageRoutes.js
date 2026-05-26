import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessageStats,
  getMessages,
  updateMessageStatus
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", protect, getMessages);
router.get("/stats", protect, getMessageStats);
router.patch("/:id/status", protect, updateMessageStatus);
router.delete("/:id", protect, deleteMessage);

export default router;
