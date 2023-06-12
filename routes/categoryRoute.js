import express from "express";
import {
  adminMiddleware,
  requireSignin,
} from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  getCategoriesController,
  getCategoryController,
  deleteCategoryController,
} from "../controllers/categoryControllers.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignin,
  adminMiddleware,
  createCategoryController
);

// update category
router.put(
  "/update-category/:id",
  requireSignin,
  adminMiddleware,
  updateCategoryController
);

//get all categories
router.get("/get-categories", getCategoriesController);

//get single category
router.get("/get-category/:slug", getCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignin,
  adminMiddleware,
  deleteCategoryController
);

export default router;
