import slugify from "slugify";
import { CategoryModel } from "../models/CategoryModel.js";

/* create category controller */
export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send({ message: "Category Name is required" });
    }
    const ExistedCategory = await CategoryModel.findOne({ name });
    console.log(ExistedCategory);
    if (ExistedCategory) {
      return res.send({ success: false, message: "Category Already Existed " });
    }
    const Category = new CategoryModel({
      name,
      slug: slugify(name),
    });

    await Category.save();

    res.send({
      success: true,
      message: "new category created",
      Category,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error in create controller",
    });
  }
};

/* update category controller */

export const UpdateCategoryController = async (req, res) => {
  try {
    const { cid } = req.params;
    const { name } = req.body;
    const updateCategory = await CategoryModel.findByIdAndUpdate(
      cid,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.send({
      success: true,
      messsage: "Category Updated Successfully",
      updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error In Update Cateory",
    });
  }
};

/* delete Category */

export const DeleteCategory = async (req, res) => {
  try {
    const { cid } = req.params;
    await CategoryModel.findByIdAndDelete(cid);
    res.send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error In Delete Cateory",
    });
  }
};

// get all cat
export const GetAllCategoryController = async (req, res) => {
  try {
    const getCategory = await CategoryModel.find({});
    res.send({
      success: true,
      message: "All Categories List",
      category: getCategory,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const GetSingleCategoryController = async (req, res) => {
  try {
    const singleCategory = await CategoryModel.findOne({
      id: req.params._id,
    });
    res.send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      singleCategory,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};
