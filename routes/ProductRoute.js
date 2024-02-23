import express from "express";
import {
  CreateProductController,
  brainTreePaymentController,
  braintreeTokenController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/ProductController.js";
import { VerifySignin, isAdmin } from "../middlewares/UserMiddleware.js";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-product",
  VerifySignin,
  isAdmin,
  formidable(),
  CreateProductController
);

router.put(
  "/update-product/:pid",
  VerifySignin,
  isAdmin,
  formidable(),
  updateProductController
);

router.get("/getall-product", getProductController);

router.get("/single-product/:slug", getSingleProductController);

router.delete("/delete-product/:pid", deleteProductController);

router.get("/get-photo/:pid", productPhotoController);

router.post("/filter-product", productFilterController);

router.get("/search-product/:keyword", searchProductController);

//product per page
router.get("/product-list/:page", productListController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", VerifySignin, brainTreePaymentController);

export default router;
