import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  validateCreateComment,
  validateUpdateComment,
} from "../validation/commentValidate.js";
import {
  createComment,
  deleteComment,
  getCommentCollection,
  getCommentsInPost,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getCommentCollection);

router.get("/:postId", verifyUser, getCommentsInPost);

router.post("/create", verifyUser, validateCreateComment, createComment);

router.delete("/delete/:id", verifyUser, validateUpdateComment, deleteComment);

export default router;
