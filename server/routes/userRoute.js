import express from "express";
import {
  forgotPassword,
  getUserDetail,
  getAllUsers,
  getUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
  updateUserRole,
  userLogin,
  userLogout,
  userRegister,
  removeUser,
} from "../controllers/userController.js";
import { isUserAuthenticated, authorizeRoles } from "../middlewares/auth.js";

export const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/profile", isUserAuthenticated, getUserDetail);
router.put("/password/update", isUserAuthenticated, updatePassword);
router.put("/profile/update", isUserAuthenticated, updateUserProfile);
router.get(
  "/admin/users",
  isUserAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
router.get(
  "/admin/user/:id",
  isUserAuthenticated,
  authorizeRoles("admin"),
  getUser
);


export const user = router;
