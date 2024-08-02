import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  createPost,
  deletePost,
  getPostCollection,
  getPostDetail,
  getPosts,
  getPostStats,
  updatePost,
  viewPost,
} from "../controllers/postController.js";
import {
  validateCreatePost,
  validateUpdatePost,
} from "../validation/postValidate.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getPostCollection);

router.get("/", verifyUser, getPosts);

router.get("/stats", verifyAdmin, getPostStats);

router.get("/:id", verifyUser, getPostDetail);

router.post("/create", verifyAdmin, validateCreatePost, createPost);

router.put("/update/:id", verifyAdmin, validateUpdatePost, updatePost);

router.put("/view/:id", verifyUser, viewPost);

router.delete("/delete/:id", verifyAdmin, deletePost);

export default router;
