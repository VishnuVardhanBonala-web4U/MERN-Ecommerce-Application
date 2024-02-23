import express from "express";
import { VerifySignin, isAdmin } from "../middlewares/UserMiddleware.js";

import {
  CreateCategoryController,
  DeleteCategory,
  GetAllCategoryController,
  GetSingleCategoryController,
  UpdateCategoryController,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  VerifySignin,
  isAdmin,
  CreateCategoryController
);

router.put(
  "/update-category/:cid",
  VerifySignin,
  isAdmin,
  UpdateCategoryController
);

router.delete("/delete-category/:cid", VerifySignin, isAdmin, DeleteCategory);

router.get("/get-category", GetAllCategoryController);

router.get("/getsingle-category/:id", GetSingleCategoryController);

export default router;
