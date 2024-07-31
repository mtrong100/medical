import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  createPost,
  deletePost,
  getPostCollection,
  getPostDetail,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import {
  validateCreatePost,
  validateUpdatePost,
} from "../validation/postValidate.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getPostCollection);

router.get("/", verifyUser, getPosts);

router.get("/:id", verifyUser, getPostDetail);

router.post("/create", verifyAdmin, validateCreatePost, createPost);

router.put("/update/:id", verifyAdmin, validateUpdatePost, updatePost);

router.delete("/delete/:id", verifyAdmin, deletePost);

export default router;
