import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { validateSendMessage } from "../validation/messageValidate.js";

const router = express.Router();

router.get("/:id", verifyUser, getMessages);
router.post("/send/:id", verifyUser, validateSendMessage, sendMessage);

export default router;
