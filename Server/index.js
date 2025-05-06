import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnection from "../config/db.js";
import productRoutes from "../routes/productRoutes.js";
import AuthRoutes from "../routes/AuthRoutes.js";
import UserRoutes from "../routes/UserRoutes.js";
import AdminRoutes from "../routes/AdminRoutes.js";
import fileUpload from "express-fileupload";

// Load environment variables
dotenv.config();

const app = express();
const frontendUrl =
  process.env.FRONTEND_URL?.replace(/\/+$/, "") || "http://localhost:5173";

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [frontendUrl, "http://localhost:5173"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || frontendUrl);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(fileUpload());

app.use("/api/products", productRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/admin", AdminRoutes);

await dbconnection();

export default app;
