import Jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/Userauth.js";
import { UserModel } from "../models/UserModel.js";
import orderModel from "../models/orderModel.js";

/* register controller */
export const RegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    /* checking input fields */
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send({
        success: false,
        message: "please  fill all Details ",
      });
    }

    /* existed user */
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.send({
        success: false,
        message: "User Already Existed  ",
      });
    }
    /* hashing password */
    const hashedPassword = await hashPassword(password);

    /* storing into database */
    const user = await new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      answer,
    }).save();

    return res.send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error  in Registeration",
      error: error,
    });
  }
};

/* login controller */

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        success: false,
        message: "please  fill all Details ",
      });
    }

    /* user existed or not checking  */
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "Please Register before continue Login  ",
      });
    }

    /* password checking */
    const passMatch = await comparePassword(password, user.password);
    if (!passMatch) {
      return res.send({
        success: false,
        message: "Invalid email or  Password",
      });
    }

    /* token  */
    const token = await Jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.send({
      success: true,
      message: "login successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        answer: user.answer,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error  in Login",
      error: error,
    });
  }
};

/* export const testController = async (req, res) => {
  try {
    return res.send({
      success: true,
      messageL: " Protected routes ",
    });
  } catch (error) {
    return res.send({
      success: false,
      messageL: " error in jwt routes ",
    });
  }
}; */

export const ForgetPassController = async (req, res) => {
  try {
    const { email, answer, newpassword } = await req.body;
    if (!email || !answer || !newpassword) {
      return res.send({
        success: false,
        message: "please  fill all Details ",
      });
    }

    const user = await UserModel.findOne({ email, answer });
    if (!user) {
      return res.send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    const hashed = await hashPassword(newpassword);
    await UserModel.findByIdAndUpdate(user._id, { password: hashed });
    console.log(user.id);
    return res.send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.send({
      success: false,
      message: "Error  in Forget Password",
      error: error,
    });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await UserModel.findById(req.user._id);

    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While updating  Order",
      error,
    });
  }
};
