import express from "express";
import {
  forgotPassword,
  getUserDetail,
  resetPassword,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

export const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/profile", isUserAuthenticated, getUserDetail);

export const user = router;
