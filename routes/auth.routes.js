import { Router } from "express";
import { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword } from "../controller/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
