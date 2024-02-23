import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`connected to MongoDb Host at  ${conn.connection.host}`);
  } catch (error) {
    console.log(`connection Failed due to ${error}`);
  }
};
