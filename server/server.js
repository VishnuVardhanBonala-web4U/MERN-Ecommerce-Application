import express from "express";
import { ConnectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import categoryRouter from "./routes/CategoryRoute.js";
import productRouter from "./routes/ProductRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Frontend build path configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../client/build");
app.use(express.static(buildPath));
app.use(
  cors({
    origin: "*",
  })
);

/* Routers (keeping existing routes intact) */
app.use(userRouter);
app.use(categoryRouter);
app.use(productRouter);

/* Uncommented the frontend fallback route */
app.use("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

/* Server Listen */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
  ConnectDB(); // Connect to the database after the server starts
});
