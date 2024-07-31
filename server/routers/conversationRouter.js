import express from "express";
import { getConversation } from "../controllers/conversationController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyAdmin, getConversation);

export default router;
