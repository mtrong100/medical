import express from "express";
import {
  getUserDetail,
  updateUser,
  getUserCollection,
  deleteUser,
  updateUserAccount,
  updateUserPassword,
  sendOtp,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  validateUpdatePassword,
  validateUpdateUserData,
  validateUserAccountStatus,
  validateUserEmail,
} from "../validation/userValidate.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getUserCollection);

router.get("/:id", verifyUser, getUserDetail);

router.post("/send-otp", validateUserEmail, sendOtp);

router.put("/update-password", validateUpdatePassword, updateUserPassword);

router.put("/update/:id", verifyUser, validateUpdateUserData, updateUser);

router.put(
  "/update-account/:id",
  verifyAdmin,
  validateUserAccountStatus,
  updateUserAccount
);

router.delete("/delete/:id", verifyAdmin, deleteUser);

export default router;
