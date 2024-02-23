import express from "express";
import {
  ForgetPassController,
  LoginController,
  RegisterController,
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
  updateProfileController,
} from "../controllers/UserController.js";

import {
  IsUser,
  VerifySignin,
  isAdmin,
} from "../middlewares/UserMiddleware.js";

const router = express.Router();

/* users Routes  */

router.get("/user", (req, res) => {
  res.send("<h1>user get route </h1>");
});

/* user routes */

router.post("/register", RegisterController);

router.post("/login", LoginController);

router.post("/forgetpass", ForgetPassController);

/* dashboard */

/* user private route */
router.get("/user-private", VerifySignin, IsUser, (req, res) => {
  res.send({
    ok: true,
  });
});

/* admin private route */
router.get("/admin-private", VerifySignin, isAdmin, (req, res) => {
  res.send({
    ok: true,
  });
});

//update profile
router.put("/profile", VerifySignin, updateProfileController);

//orders
router.get("/orders", VerifySignin, getOrdersController);

//all orders
router.get("/all-orders", VerifySignin, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  VerifySignin,
  isAdmin,
  orderStatusController
);

export default router;
