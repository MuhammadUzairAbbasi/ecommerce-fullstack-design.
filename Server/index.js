import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnection from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import fileUpload from "express-fileupload";

dbconnection();
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Normalize the FRONTEND_URL by removing trailing slashes
const frontendUrl = process.env.FRONTEND_URL?.replace(/\/+$/, "");

// CORS configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/admin", AdminRoutes);
app.use('/',()=>{
  console.log('Chal gaya');
  
})

// app.listen(port, () => {
//   console.log(`Server Running on port ${port}`);
// });
export default app;
