import express from "express";
import { addProduct, deleteProduct } from "../controllers/AdminController.js";

const router = express.Router();

router.post("/addProduct", addProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
