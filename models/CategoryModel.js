import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export const CategoryModel = mongoose.model("category", CategorySchema);
