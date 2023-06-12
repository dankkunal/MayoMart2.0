import express from "express";
import {
  adminMiddleware,
  requireSignin,
} from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createProductController,
  getProductController,
  getProductsController,
  deleteProductController,
  getProductPhotoController,
  updateProductController,
} from "../controllers/productControllers.js";

const router = express.Router();

// routes
// create product
router.post(
  "/create-product",
  requireSignin,
  adminMiddleware,
  formidable(),
  createProductController
);

//get all products
router.get("/get-products", getProductsController);

// get single product
router.get("/get-product/:slug", getProductController);

// get photo
router.get("/get-product-photo/:productId", getProductPhotoController);

// update product
router.put(
  "/update-product/:productId",
  requireSignin,
  adminMiddleware,
  formidable(),
  updateProductController
);

//delete product
router.delete(
  "/delete-product/:productId",
  requireSignin,
  adminMiddleware,
  deleteProductController
);

export default router;
