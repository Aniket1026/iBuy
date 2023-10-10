import express from "express";
import {
  createProducts,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getAllReviews,
  productDetails,
  productReview,
  productUpdate,
} from "../controllers/productController.js";
import { authorizeRoles, isUserAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/products", getAllProducts);
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
router.get('/reviews', getAllReviews)
router.delete('/review', isUserAuthenticated, deleteReview)


export const product = router;
