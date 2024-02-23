import Jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

/* verifying jwt token before login  */
export const VerifySignin = async (req, res, next) => {
  try {
    const decode = await Jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );

    req.user = await decode;

    next();
  } catch (error) {
    return res.send({
      success: false,
      message: "UnAuthorized Access",
      error: error,
    });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

//User  acceess
export const IsUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.role !== 0) {
      return res.send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error,
      message: "Error in User middelware",
    });
  }
};
