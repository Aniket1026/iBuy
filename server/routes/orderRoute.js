import express from "express";
import { authorizeRoles, isUserAuthenticated } from "../middlewares/auth.js";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders/create", isUserAuthenticated, newOrder);
router.get("/order/:id", isUserAuthenticated, getSingleOrder);
router.get("/my-orders", isUserAuthenticated, myOrders);
router.get(
  "/admin/orders",
  isUserAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);
router.put(
  "/admin/order/:id",
  isUserAuthenticated,
  authorizeRoles("admin"),
  updateOrder
);
router.delete(
  "/admin/order/:id",
  isUserAuthenticated,
  authorizeRoles("admin"),
  deleteOrder
);

export const order = router;
