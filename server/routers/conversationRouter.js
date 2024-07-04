import express from "express";
import { getConversation } from "../controllers/conversationController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.get("/", verifySpecificRole, getConversation);

export default router;
