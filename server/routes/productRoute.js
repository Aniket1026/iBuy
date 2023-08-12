import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  productDetails,
  productUpdate,
} from "../controllers/productController.js";
import { authorizeRoles, isUserAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/products", isUserAuthenticated, getAllProducts);
router.post(
  "/product/new",
  isUserAuthenticated,
  authorizeRoles("admin"),
  createProducts
);
router.put(
  "/product/:id",
  isUserAuthenticated,
  authorizeRoles("admin"),
  productUpdate
);
router.delete(
  "/product/:id",
  isUserAuthenticated,
  authorizeRoles("admin"),
  deleteProduct
);
router.get(
  "/product/:id",
  isUserAuthenticated,
  productDetails
);

export const product = router;
