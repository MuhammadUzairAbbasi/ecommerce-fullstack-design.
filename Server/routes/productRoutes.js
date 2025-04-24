import {
  getAllProducts,
  getProductbyId,
  featuredProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import express from "express";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProductbyId/:id", getProductbyId);
router.get("/featuredProducts", featuredProducts);
router.post("/createProduct", createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;