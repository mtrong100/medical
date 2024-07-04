import express from "express";
import {
  getUserDetail,
  updateUser,
  getUserCollection,
  deleteUser,
} from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.get("/collection", verifySpecificRole, getUserCollection);

router.get("/:id", protectedRoute, getUserDetail);

router.put("/update/:id", protectedRoute, updateUser);

router.delete("/delete/:id", verifySpecificRole, deleteUser);

export default router;
