import express from "express";
import { ConnectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import categoryRouter from "./routes/CategoryRoute.js";
import productRouter from "./routes/ProductRoute.js";
import path from "path";

dotenv.config();

const app = express();

/* middles wares */
app.use(cors());
app.use(express.json());


//frontend build path configuration
const __dirname = path.dirname("");
const buildPath = path.join(__dirname, "../client/build")
app.use(express.static(buildPath));
app.use(
  cors({
    "origin": "*"
  })
)
//frontend build path configuration


app.use(userRouter);
app.use(categoryRouter);
app.use(productRouter);
/* route aliases */

/* app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build"));
}); */

/* server listen */
app.listen(process.env.PORT, async (req, res) => {
  await ConnectDB();
  console.log(`SERVER RUNNING ON PORT ${process.env.port}`);
});
/* server listen */
