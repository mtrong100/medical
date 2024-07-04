import express from "express";
import {
  googleLogin,
  login,
  logout,
  register,
  resetPassword,
  sendOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/google-login", googleLogin);

router.post("/logout", logout);

router.post("/reset-password", resetPassword);

router.post("/send-otp", sendOtp);

export default router;
