import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnection from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import fileUpload from "express-fileupload";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Normalize the FRONTEND_URL by removing trailing slashes
const frontendUrl =
  process.env.FRONTEND_URL?.replace(/\/+$/, "") ||
  "https://ecommerce-fullstack-frontend-gamma.vercel.app";

// Secure CORS configuration
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

// Middleware
app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/admin", AdminRoutes);

// Connect to the database before exporting the app
(async () => {
  try {
    await dbconnection();
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

// Export the app at the top level
export default app;
