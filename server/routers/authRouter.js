import express from "express";
import {
  googleLogin,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import {
  validateGoogleLoginUserData,
  validateLoginUserData,
  validateRegisterUserData,
} from "../validation/userValidate.js";

const router = express.Router();

router.post("/register", validateRegisterUserData, register);

router.post("/login", validateLoginUserData, login);

router.post("/google-login", validateGoogleLoginUserData, googleLogin);

router.post("/logout", logout);

export default router;
