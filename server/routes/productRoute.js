import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  productDetails,
  productReview,
  productUpdate,
} from "../controllers/productController.js";
import { authorizeRoles, isUserAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/products", isUserAuthenticated, getAllProducts);
router.post(
  "/admin/product/new",
  isUserAuthenticated,
  authorizeRoles("admin"),
  createProducts
);
router.put(
  "/admin/product/:id",
  isUserAuthenticated,
  authorizeRoles("admin"),
  productUpdate
);
router.delete(
  "/admin/product/:id",
  isUserAuthenticated,
  authorizeRoles("admin"),
  deleteProduct
);
router.get("/product/:id", isUserAuthenticated, productDetails);
router.put("/product/review", isUserAuthenticated, productReview);

export const product = router;
