import express from "express";
import { ConnectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import categoryRoute from "./routes/CategoryRoute.js";
import productRouter from "./routes/ProductRoute.js";
import path from "path";

dotenv.config();

const app = express();

/* middles wares */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(userRouter);
app.use(categoryRoute);
app.use(productRouter);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(process.env.PORT, async (req, res) => {
  await ConnectDB();
  console.log(`SERVER RUNNING ON PORT ${process.env.port}`);
});
