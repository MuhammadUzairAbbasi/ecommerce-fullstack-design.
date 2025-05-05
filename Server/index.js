import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnection from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import fileUpload from "express-fileupload";
// import seedDatabase from "./config/seeddb.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(fileUpload());

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);
dbconnection();

app.use("/api/products", productRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/admin", AdminRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);

//   // seedDatabase();
// });
