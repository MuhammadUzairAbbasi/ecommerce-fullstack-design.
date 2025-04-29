import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnection from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
// import seedDatabase from "./config/seeddb.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  dbconnection();
  // seedDatabase();
});
