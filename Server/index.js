import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnection from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Normalize the FRONTEND_URL by removing trailing slashes
const frontendUrl = process.env.FRONTEND_URL?.replace(/\/+$/, "");

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from the frontend or during development (e.g., localhost)
      const allowedOrigins = [frontendUrl, "http://localhost:5173"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies/credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// Middleware to handle preflight requests explicitly
app.options("*", cors()); // Handle preflight for all routes

app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/admin", AdminRoutes);

export default app;
