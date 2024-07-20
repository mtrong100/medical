import express from "express";
import {
  getUserDetail,
  updateUser,
  getUserCollection,
  deleteUser,
} from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/collection", getUserCollection);

router.get("/:id", protectedRoute, getUserDetail);

router.put("/update/:id", updateUser);

router.delete("/delete/:id", deleteUser);

export default router;
